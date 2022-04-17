import { calculateFee, GasPrice } from "@cosmjs/stargate";

export const mintCallFromUser = async (Config) => {
  const account = JSON.parse(localStorage.getItem("account")).account.address;
  const wasmClient = JSON.parse(localStorage.getItem("wasmClient"));
  const gasPrice = GasPrice.fromString("0.002uan1");

  let entrypoint = {
    mint: {},
  };

  const txFee = calculateFee(300000, gasPrice);

  const result = await wasmClient.execute(
    account,
    Config.minter_contract,
    entrypoint,
    txFee,
    "mint sender"
  );

  console.log("Mint call from user Tx", result);
  return result;
};

export const mintToRecipient = async (Config) => {
  const account = JSON.parse(localStorage.getItem("account")).account.address;
  const wasmClient = JSON.parse(localStorage.getItem("wasmClient"));
  const gasPrice = GasPrice.fromString("0.002uan1");

  let entrypoint = {
    mint_to: { recipient: Config.recipient },
  };

  const txFee = calculateFee(300000, gasPrice);

  const result = await wasmClient.execute(
    account,
    Config.minter_contract,
    entrypoint,
    txFee,
    "mint to"
  );

  console.log(
    "Mint a NFT without tokenId to recipient (call from admin) Tx",
    result
  );
  return result;
};

export const mintForRecipient = async (Config) => {
  const account = JSON.parse(localStorage.getItem("account")).account.address;
  const wasmClient = JSON.parse(localStorage.getItem("wasmClient"));
  const gasPrice = GasPrice.fromString("0.002uan1");

  let entrypoint = {
    mint_for: { token_id: Number(Config.tokenId), recipient: Config.recipient },
  };

  const txFee = calculateFee(300000, gasPrice);

  const result = await wasmClient.execute(
    account,
    Config.minter_contract,
    entrypoint,
    txFee,
    "mint for"
  );

  console.log(
    "Mint a NFT with tokenId for recipient (call from admin) Tx",
    result
  );
  return result;
};
