import React, { useState } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";

const RequestNew = ({ address }) => {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  const valueHandler = (event) => {
    setValue(event.target.value);
  };

  const recipientHandler = (event) => {
    setRecipient(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const campaign = Campaign(address);
    setLoading(true);
    setError("");
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({
          from: accounts[0],
        });
      Router.pushRoute(`/campaigns/${address}/requests`);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };
  return (
    <Layout>
      <Link route={`/campaigns/${address}/requests`}>
        <a>Back</a>
      </Link>
      <h3>Create a Request</h3>
      <Form onSubmit={submitHandler} error={!!error}>
        <Form.Field>
          <label>Description</label>
          <Input value={description} onChange={descriptionHandler} />
        </Form.Field>
        <Form.Field>
          <label>Value in Ether</label>
          <Input value={value} onChange={valueHandler} />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input value={recipient} onChange={recipientHandler} />
        </Form.Field>
        <Message error header="Ops" content={error} />
        <Button primary loading={loading}>
          Create!
        </Button>
      </Form>
    </Layout>
  );
};

RequestNew.getInitialProps = async (props) => {
  const { address } = props.query;

  return {
    address,
  };
};

export default RequestNew;
