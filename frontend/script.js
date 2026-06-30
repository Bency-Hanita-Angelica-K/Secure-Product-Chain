let provider;
let signer;

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const abi = [
  "function addProduct(string,string,string)",
  "function verifyProduct(string) view returns(string,string,string,bool)"
];

async function connectWallet() {
    await window.ethereum.request({ method: "eth_requestAccounts" });

    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();

    alert("Wallet Connected");
}

async function addProduct() {

    try {

        const contract = new ethers.Contract(contractAddress, abi, signer);

        const id = document.getElementById("productId").value;
        const name = document.getElementById("productName").value;
        const manufacturer = document.getElementById("manufacturer").value;

        const tx = await contract.addProduct(id, name, manufacturer);

        console.log(tx);

        await tx.wait();

        alert("Product Added Successfully");

    } catch (e) {
        console.log(e);
        alert(e.message);
    }
}

async function verifyProduct() {

    const contract = new ethers.Contract(contractAddress, abi, provider);

    const id = document.getElementById("verifyId").value;

    try {

        const data = await contract.verifyProduct(id);

        console.log(data);

        document.getElementById("result").innerHTML =
        `ID: ${data[0]} <br>
         Name: ${data[1]} <br>
         Manufacturer: ${data[2]} <br>
         Genuine: ${data[3]}`;

    } catch (e) {
        console.log(e);
        alert(e.message);
    }
}