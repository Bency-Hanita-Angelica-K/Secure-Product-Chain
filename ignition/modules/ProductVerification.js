const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ProductVerificationModule", (m) => {
  const productVerification = m.contract("ProductVerification");

  return { productVerification };
});