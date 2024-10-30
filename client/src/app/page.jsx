"use client";
import React, { useEffect, useState } from "react";
import { DisplayCampaigns } from "@/components";
import { useStateContext } from "../context";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentAccount, connectWallet, contract, getCampaigns, data } =
    useStateContext();
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (contract) {
        await getCampaigns(); // Fetch campaigns from the contract
      }
    };

    fetchCampaigns(); // Call it when the component mounts or currentAccount changes
  }, [contract, currentAccount, campaigns, data]);

  console.log(contract, currentAccount, campaigns, data);

  useEffect(() => {
    setCampaigns(data); // Set campaigns whenever data changes
  }, [data, contract, currentAccount, campaigns]);

  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Home;
