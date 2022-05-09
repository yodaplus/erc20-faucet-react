import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TokenSend from "./components/TokenSend.js";
import Faucet from "./components/Faucet.js";
import FiatTokenV1 from "./artifacts/contracts/FiatTokenV1.sol/FiatTokenV1.json";
import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function App() {
  const Token = FiatTokenV1;
  useEffect(() => {
    window.ethereum.enable();
  }, []);
  return (
    <div className="App">
      <div>
        <h2>YPUSDC Apothem Faucet</h2>
        <Card.Body>
          <Container>
            <Row className="justify-content-md-center">
              <Col>
                <Faucet tokenContract={Token} />
              </Col>
              <Col>
                <TokenSend tokenContract={Token} />
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </div>
    </div>
  );
}

export default App;
