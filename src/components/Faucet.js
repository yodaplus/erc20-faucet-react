import { useState } from "react";
import { ethers } from "ethers";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Message from "./Message";
import Web3 from "web3";

const Faucet = (props) => {
  // const tokenAddress = "0xfee657401b5955b05e10fe47c9fbf0b607b25272";

  const [token, setToken] = useState({
    tokenAddress: "0xfee657401b5955b05e10fe47c9fbf0b607b25272",
    tokenSymbol: "YPUSDC",
    tokenDecimal: 6,
  });

  const [balance, setBalance] = useState();
  const [showBalance, setShowBalance] = useState(false);

  async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      const account = await web3.eth.getAccounts().then((accounts) => {
        return accounts[0];
      });
      const contract = new web3.eth.Contract(
        props.tokenContract.abi,
        token.tokenAddress
      );
      const balance = await contract.methods.balanceOf(account).call();
      console.log("Balance: ", balance.toString());
      setBalance(balance.toString());
      setShowBalance(true);
    }
  }

  async function faucet() {
    console.log("Faucet");
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      const account = await web3.eth.getAccounts().then((accounts) => {
        return accounts[0];
      });
      console.log("Account: ", account);

      const contract = new web3.eth.Contract(
        props.tokenContract.abi,
        token.tokenAddress
      );

      const tx = await contract.methods.mint(account, "1000000000000").send({
        from: account,
      });
    }
  }
  async function addFiatTokenToMetaMask() {
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      const provider = web3.currentProvider;
      await provider.sendAsync({
        method: "metamask_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: token.tokenAddress,
            symbol: token.tokenSymbol,
            decimals: token.tokenDecimal,
          },
        },
        id: Math.round(Math.random() * 100000),
      });
    }
  }

  const handleChange = (e) => {
    // switch case for the different input fields
    switch (e) {
      case "YPUSDC":
        setToken({
          tokenAddress: "0xfee657401b5955b05e10fe47c9fbf0b607b25272",
          tokenSymbol: "YPUSDC",
          tokenDecimal: 6,
        });
        break;

      case "USNOTA":
        setToken({
          tokenAddress: "0x47fc035247d2ca9a49b2b6bc520a33a402c05bbc",
          tokenSymbol: "USNOTA",
          tokenDecimal: 6,
        });
        break;
      case "HSBCUSD":
        setToken({
          tokenAddress: "0xBcB3aFA86BFBC6505068A939A0928Ffe74cA5A34",
          tokenSymbol: "HSBCUSD",
          tokenDecimal: 6,
        });
        break;
      case "FAUCET":
        setToken({
          tokenAddress: "0xe083B415E7430D5b405bB1881b09dF98372b34Da",
          tokenSymbol: "FAUCET",
          tokenDecimal: 6,
        });
        break;
      default:
        setToken({
          tokenAddress: "0xfee657401b5955b05e10fe47c9fbf0b607b25272",
          tokenSymbol: "YPUSDC",
          tokenDecimal: 6,
        });
        break;
    }
  };
  return (
    <div>
      <Card style={{ background: "rgba(241, 242, 246,0.75)", height: "290px" }}>
        <Card.Body>
          <Card.Subtitle>
            Receive {token.tokenSymbol} ERC20 to your wallet
          </Card.Subtitle>
          <br></br>
          <div className="d-grid gap-2">
            <Form.Control
              as="select"
              onChange={(e) => {
                console.log(e.target.value);
                console.log(e);
                handleChange(e.target.value);
              }}
            >
              <option value="YPUSDC">YPUSDC</option>
              <option value="USNOTA">USNOTA</option>
              <option value="HSBCUSD">HSBCUSD</option>
              <option value="FAUCET">FAUCET</option>
            </Form.Control>

            <Button onClick={faucet}>Get 1,000,000 YPUSDC Token!</Button>
            <Button onClick={addFiatTokenToMetaMask} variant="warning">
              Add Token To My Wallet
            </Button>
            <Button onClick={getBalance} variant="warning">
              Check My Balance
            </Button>
            {showBalance ? <Message balance={balance} /> : null}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Faucet;
