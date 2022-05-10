import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TokenSend from "./components/TokenSend.js";
import Faucet from "./components/Faucet.js";
import FiatTokenV1 from "./artifacts/contracts/FiatTokenV1.sol/FiatTokenV1.json";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";

function App() {
  const TokenContract = FiatTokenV1;

  const [token, setToken] = useState({
    tokenAddress: "0xfee657401b5955b05e10fe47c9fbf0b607b25272",
    tokenSymbol: "YPUSDC",
    tokenDecimal: 6,
  });

  useEffect(() => {
    window.ethereum.enable();
  }, []);

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
      case "FAUCET":
        setToken({
          tokenAddress: "0xe083B415E7430D5b405bB1881b09dF98372b34Da",
          tokenSymbol: "FAUCET",
          tokenDecimal: 6,
        });
        break;
      case "HELLO":
        setToken({
          tokenAddress: "0x6190AC2c7B43c931bbE4C8336eaAEAaa9d9e2eeE",
          tokenSymbol: "HELLO",
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
    <div className="App">
      <div>
        <h2>XRC20 Apothem Faucet</h2>
        <Card.Body>
          <Container>
            <p>Select Token to Mint and Transfer</p>
            <Form.Control
              className="mb-4"
              as="select"
              onChange={(e) => {
                console.log(e.target.value);
                console.log(e);
                handleChange(e.target.value);
              }}
            >
              <option value="YPUSDC">YPUSDC</option>
              <option value="FAUCET">FAUCET</option>
              <option value="HELLO">HELLO</option>
            </Form.Control>
            <Row className="justify-content-md-center">
              <Col>
                <Faucet tokenContract={TokenContract} token={token} />
              </Col>
              <Col>
                <TokenSend tokenContract={TokenContract} token={token} />
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </div>
    </div>
  );
}

export default App;
