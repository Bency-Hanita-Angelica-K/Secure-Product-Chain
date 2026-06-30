const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('ProductVerification', function () {
  it('adds and verifies a product', async function () {
    const ProductVerification = await ethers.getContractFactory('ProductVerification');
    const contract = await ProductVerification.deploy();

    await contract.addProduct('P001', 'Smart Watch', 'ABC Pvt Ltd', 'Electronics', 'BATCH01', 1719792000, 'metadataHash');
    const product = await contract.verifyProduct('P001');

    expect(product[0]).to.equal('P001');
    expect(product[1]).to.equal('Smart Watch');
    expect(product[8]).to.equal(true);
  });
});
