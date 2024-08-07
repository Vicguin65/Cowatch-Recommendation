import React, { useState, useEffect } from "react";
import axios from "axios";

const DemoPage = () => {
  const handleAuthOne = () => {
    window.location.href = "http://localhost:5000/auth?user=1";
  };

  const handleAuthTwo = () => {
    window.location.href = "http://localhost:5000/auth?user=2";
  };

  const [channelOne, setChannelOne] = useState(null);

  useEffect(() => {
    axios.get(`${URL}/get-subscriptions-1`).then((response) => {
      setChannelOne(response.data);
    });
  }, []);

  const [channelTwo, setChannelTwo] = useState(null);

  useEffect(() => {
    axios.get(`${URL}/get-subscriptions-2`).then((response) => {
      setChannelTwo(response.data);
    });
  }, []);

  return (
    <div>
      <button onClick={handleAuthOne}>Select User 1</button>
      <button onClick={handleAuthTwo}>Select User 2</button>
      <h1>User one channels:</h1>
      <ItemList items={channelOne} />

      <br />
      <h1>User two channels:</h1>
      <ItemList items={channelTwo} />
    </div>
  );
};

const ItemList = ({ items }) => {
  if (!items) return;
  return (
    <ul>
      {items.map((item) => (
        <h1>{JSON.stringify(item["snippet"]["title"])}</h1>
      ))}
    </ul>
  );
};

export default DemoPage;
