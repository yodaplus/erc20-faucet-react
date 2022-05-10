require("dotenv").config();
module.exports = async ({ getNamedAccounts, deployments, network }) => {
  const { deploy } = deployments;
  const { owner } = await getNamedAccounts();
  const { TKNNAME, SYMBOL, CURRENCY, DECIMALS, OWNER } = process.env;
  const tokenName = TKNNAME ?? "FiatToken";
  const tokenSymbol = SYMBOL ?? "Fiat";
  const tokenCurrency = CURRENCY ?? "USD";
  const tokenDecimals = DECIMALS ?? "6";
  const tokenOwner = OWNER ?? owner;

  // const tokenName = process.argv[-3];
  // const tokenSymbol = process.argv[-2];
  // const tokenCurrency = process.argv[-1];

  await deploy("FiatTokenV1", {
    from: owner,
    args: [tokenName, tokenSymbol, tokenCurrency, tokenDecimals, tokenOwner],
    // ...deployOptions,
  });
};

module.exports.tags = ["FiatTokenV1"];
