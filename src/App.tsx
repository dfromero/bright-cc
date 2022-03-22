import React  from "react";
import CreditCardInput from "./CreditCardInput";

const App = () => {
  const onSubmitForm = (data: any) => {
    console.log("onSubmitForm", data);
  };

  return <CreditCardInput onSubmitForm={onSubmitForm} />;
};

export default App;
