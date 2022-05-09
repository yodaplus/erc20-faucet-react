import { useState } from "react";
import { ethers } from "ethers";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import Web3 from "web3";

const tokenAddress = "0xfee657401b5955b05e10fe47c9fbf0b607b25272";

const TokenSend = (props) => {
  const [userAccount, setUserAccount] = useState();
  const [amount, setAmount] = useState();
  const [transctionInProgress, setTransctionInProgress] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");

  // request access to the user's MetaMask account
  async function requestAccount() {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
  }

  async function sendCoins() {
    if (typeof window.ethereum !== "undefined") {
      const account = await requestAccount();
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(
        props.tokenContract.abi,
        tokenAddress
      );
      let newAccount = userAccount.replace("xdc", "0x");
      let newAmount = amount * 1000000;
      setTransctionInProgress(true);
      const transation = await contract.methods
        .transfer(newAccount, newAmount)
        .send({
          from: account,
        });
      setTransctionInProgress(false);
      setTransactionHash(transation.transactionHash);
      console.log(transation);
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }
  return (
    <Card style={{ background: "rgba(241, 242, 246,0.75)", height: "290px" }}>
      <Card.Body>
        <Card.Subtitle> Send YPUSDC to an address</Card.Subtitle>
        <br></br>
        <div className="d-grid gap-2">
          <input
            onChange={(e) => setUserAccount(e.target.value)}
            placeholder="Payee XDC address"
          />
          <input
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
          <Button onClick={sendCoins} variant="success">
            send
          </Button>
        </div>
        {transctionInProgress && (
          <div>
            <br></br>
            <Alert variant="info">Transaction Pending ... </Alert>
          </div>
        )}
        {transactionHash && (
          <div className="mt-4">
            <a
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://explorer.apothem.network/txs/${transactionHash}`}
            >
              View Transaction
            </a>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default TokenSend;
