import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import {Router} from "../../routes";//router es para irse a otra como un history/navigate

const New = () => {
  const [minimumContribution, setMinimumContribution] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputHandler = (event) => {
    setMinimumContribution(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
        const accounts = await web3.eth.getAccounts();
        await factory.methods
        .createCampaign(minimumContribution)
        .send({
            from: accounts[0]
        });

        Router.pushRoute('/');        
    } catch (error) {
        setError(error.message);
        
    }
    setLoading(false);
  }

  return (
    <Layout>
      <h3>Create a Campaign</h3>

      <Form onSubmit={submitHandler} error={!!error}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minimumContribution}
            onChange={inputHandler}
          />
        </Form.Field>
        <Message error header="Oops!" content={error} />
        <Button loading={loading} primary>Create!</Button>
      </Form>
    </Layout>
  );
};

export default New;
