// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract ProductVerification {
    address public owner;

    struct Product {
        string productId;
        string productName;
        string manufacturer;
        string category;
        string batchNo;
        uint256 manufacturingDate;
        string metadataHash;
        bool isGenuine;
        bool exists;
    }

    mapping(string => Product) private products;
    mapping(address => bool) public approvedManufacturers;

    event ManufacturerApproved(address indexed manufacturer);
    event ProductAdded(string indexed productId, string productName, string manufacturer);
    event ProductVerified(string indexed productId, bool isGenuine);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only admin can perform this action");
        _;
    }

    modifier onlyApprovedManufacturer() {
        require(approvedManufacturers[msg.sender] || msg.sender == owner, "Manufacturer not approved");
        _;
    }

    constructor() {
        owner = msg.sender;
        approvedManufacturers[msg.sender] = true;
    }

    function approveManufacturer(address _manufacturer) public onlyOwner {
        approvedManufacturers[_manufacturer] = true;
        emit ManufacturerApproved(_manufacturer);
    }

    function addProduct(
        string memory _productId,
        string memory _productName,
        string memory _manufacturer,
        string memory _category,
        string memory _batchNo,
        uint256 _manufacturingDate,
        string memory _metadataHash
    ) public onlyApprovedManufacturer {
        require(bytes(_productId).length > 0, "Product ID is required");
        require(!products[_productId].exists, "Product already exists");

        products[_productId] = Product(
            _productId,
            _productName,
            _manufacturer,
            _category,
            _batchNo,
            _manufacturingDate,
            _metadataHash,
            true,
            true
        );

        emit ProductAdded(_productId, _productName, _manufacturer);
    }

    function verifyProduct(string memory _productId)
        public
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            string memory,
            bool,
            bool
        )
    {
        Product memory product = products[_productId];
        emit ProductVerified(_productId, product.isGenuine && product.exists);

        return (
            product.productId,
            product.productName,
            product.manufacturer,
            product.category,
            product.batchNo,
            product.manufacturingDate,
            product.metadataHash,
            product.isGenuine,
            product.exists
        );
    }
}
