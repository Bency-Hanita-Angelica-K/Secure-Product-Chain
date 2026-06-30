const API_URL = 'http://localhost:5000/api';
const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const ABI = [
  'function addProduct(string,string,string,string,string,uint256,string)',
  'function verifyProduct(string) returns(string,string,string,string,string,uint256,string,bool,bool)',
  'function approveManufacturer(address)'
];

function getToken(){ return localStorage.getItem('spc_token'); }
function getUser(){ return JSON.parse(localStorage.getItem('spc_user') || 'null'); }
function setStatus(id, msg, cls=''){ const el=document.getElementById(id); if(el){ el.className='status '+cls; el.innerHTML=msg; } }

async function api(path, method='GET', body){
  const res = await fetch(API_URL + path, { method, headers: { 'Content-Type':'application/json', Authorization: getToken() ? `Bearer ${getToken()}` : '' }, body: body ? JSON.stringify(body) : undefined });
  const data = await res.json();
  if(!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

async function connectWallet(){
  if(!window.ethereum) throw new Error('Install MetaMask first');
  await window.ethereum.request({ method:'eth_requestAccounts' });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, provider.getSigner());
}

async function registerUser() {
  try {
    const payload = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      role: document.getElementById("role").value,
      walletAddress: document.getElementById("walletAddress").value
    };

    await api("/auth/register", "POST", payload);
    setStatus("msg", "Registration successful. Please login.", "success");
  } catch (e) {
    setStatus("msg", e.message, "danger");
  }
}

async function loginUser(){
  try{
    const data = await api('/auth/login','POST',{ email:email.value, password:password.value });
    localStorage.setItem('spc_token', data.token); localStorage.setItem('spc_user', JSON.stringify(data.user));
    location.href = data.user.role === 'admin' ? 'admin.html' : data.user.role === 'manufacturer' ? 'manufacturer.html' : 'verify.html';
  }catch(e){ setStatus('msg', e.message, 'danger'); }
}

async function addProduct(){
  try{
    const contract = await connectWallet();
    const product = { productId:productId.value, productName:productName.value, manufacturer:manufacturer.value, category:category.value, batchNo:batchNo.value, manufacturingDate:manufacturingDate.value, description:description.value };
    const metadataHash = btoa(JSON.stringify(product)).slice(0, 48);
    const dateValue = Math.floor(new Date(product.manufacturingDate).getTime()/1000) || 0;
    const tx = await contract.addProduct(product.productId, product.productName, product.manufacturer, product.category, product.batchNo, dateValue, metadataHash);
    await tx.wait();
    const saved = await api('/products','POST',{ ...product, blockchainTxHash: tx.hash });
    qrResult.innerHTML = `<b class="success">Product added successfully!</b><br>Transaction: ${tx.hash}<img class="qr" src="${saved.product.qrCode}" />`;
  }catch(e){ setStatus('qrResult', e.message, 'danger'); }
}

async function verifyProduct(){
  try{
    const id = productId.value || new URLSearchParams(location.search).get('id');
    const provider = new ethers.providers.Web3Provider(window.ethereum || new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545'));
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider.getSigner ? provider.getSigner() : provider);
    const chainData = await contract.callStatic.verifyProduct(id);
    let meta = null; try { meta = await api('/products/' + encodeURIComponent(id)); } catch (_) {}
    result.innerHTML = `<h3 class="${chainData[8] ? 'success' : 'danger'}">${chainData[8] ? '✅ Genuine Product' : '❌ Product Not Found'}</h3>
    <table class="table"><tr><th>Product ID</th><td>${chainData[0]}</td></tr><tr><th>Name</th><td>${chainData[1]}</td></tr><tr><th>Manufacturer</th><td>${chainData[2]}</td></tr><tr><th>Category</th><td>${chainData[3]}</td></tr><tr><th>Batch</th><td>${chainData[4]}</td></tr></table>
    ${meta ? `<p><b>Description:</b> ${meta.description || '-'}</p><img class="qr" src="${meta.qrCode}" />` : ''}`;
  }catch(e){ setStatus('result', e.message, 'danger'); }
}

async function loadProducts(){
  try{ const rows = await api('/products'); productRows.innerHTML = rows.map(p=>`<tr><td>${p.productId}</td><td>${p.productName}</td><td>${p.manufacturer}</td><td>${p.batchNo || '-'}</td></tr>`).join(''); }catch(e){ setStatus('msg', e.message, 'danger'); }
}
