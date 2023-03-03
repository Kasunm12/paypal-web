import logo from "./logo.svg";
import { useEffect } from "react";
import axios from "axios";
import "./App.css";
import React, { useState } from "react";

import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

// async function planId() {}

// const ss = axios.get("http://localhost:8000/paypal/chat").then((response) => {
//   const email = response.data.data.id;
//   console.log(email);
// });

const ButtonWrapper = ({ type, pId }) => {
  const [{ options }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        intent: "subscription",
      },
    });
  }, [type]);

  return (
    <PayPalButtons
      createSubscription={(data, actions) => {
        console.log(pId);
        const id = pId;
        return (
          pId &&
          actions.subscription
            .create({
              plan_id: id,
            })
            .then((orderId) => {
              console.log(orderId + "Data: ");
              // Your code here after create the order
              return orderId;
            })
        );
      }}
      onApprove={(data, actions) => {
        // return actions.order.capture().then(function (details) {
        alert(
          "You have successfully created subscription " + data.subscriptionID
        ); // Optional message given to subscriber

        // Your code here after capture the order
        // });
      }}
      style={{
        label: "subscribe",
      }}
    />
  );
};

function App() {
  const [pId, setPid] = useState(null);
  const getId = async () => {
    await axios
      .get("http://ec2-3-94-181-37.compute-1.amazonaws.com:8000/paypal/video")
      .then((response) => {
        setPid(response.data.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getId();
  }, []);
  return (
    <div className="App">
      <h1> How to use Paypal</h1>
      <p>
        <span className="book-price">$13.99</span>
      </p>
      <PayPalScriptProvider
        options={{
          "client-id": "test",
          components: "buttons",
          intent: "subscription",
          vault: true,
        }}
      >
        {pId && <ButtonWrapper type="subscription" pId={pId} />}
      </PayPalScriptProvider>
    </div>
  );
}

export default App;



// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
