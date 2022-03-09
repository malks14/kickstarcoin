import React, { useState } from "react";
import { Router } from "../routes";
import { Input, Message, Form, Button } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";

const ContributeForm = ({address}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputHandler = (event) => {
    setValue(event.target.value);
    
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    //esto es para traer el address para saber donde se contribuye
    const campaign = Campaign(address);
    
    try {
        const accounts = await web3.eth.getAccounts();
        console.log(accounts)
        await campaign.methods.contribute().send({
          from: accounts[0],
          value: web3.utils.toWei(value, "ether")
        });
        

        Router.replaceRoute(`/campaigns/${address}`)
    } catch (err) {
        setError(err.message)
    }

    setLoading(false);
    setValue("");
  };

  return (
    <Form onSubmit={submitHandler} error={!!error}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          onChange={inputHandler}
          label="ether"
          labelPosition="right"
          value={value}
        />
      </Form.Field>
      <Message error header="Oops" content={error}/>
      <Button loading={loading} primary>Contribute!</Button>
    </Form>
  );
};

export default ContributeForm;

