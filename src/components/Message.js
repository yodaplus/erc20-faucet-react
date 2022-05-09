import Alert from "react-bootstrap/Alert";

const Message = ({ balance }) => {
  return (
    <div>
      <Alert variant="warning"> Balance : {balance / 1000000}</Alert>
    </div>
  );
};

export default Message;
