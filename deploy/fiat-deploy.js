module.exports = async ({ getNamedAccounts, deployments, network }) => {
  const { deploy } = deployments;
  const { owner } = await getNamedAccounts();

  await deploy("FiatTokenV1", {
    from: owner,
    // args: ["hello"],
    // ...deployOptions,
  });
};

module.exports.tags = ["FiatTokenV1"];
