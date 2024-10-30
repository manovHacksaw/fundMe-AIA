"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "@/utils/constants";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [data, setData] = useState([]);
  const [userCampaignData, setUserCampaignData] = useState([]);

  // Connect to wallet
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setCurrentAccount(accounts[0]);

    const provider = new ethers.BrowserProvider(window.ethereum);
    setProvider(provider);

    const signer = await provider.getSigner();
    setSigner(signer);

    // Load the contract
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    setContract(contractInstance);
  };

  // Create a new campaign
  const createCampaign = async (title, story, target, deadline, image) => {
    if (!contract) return;

    try {
      const weiAmount = ethers.parseUnits(target.toString(), "ether");
      const tx = await contract.createCampaign(
        title,
        story,
        weiAmount,
        deadline,
        image
      );
      await tx.wait();

      // Fetch updated campaigns after creating a new one
      await getCampaigns();
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  // Get all campaigns
  const getCampaigns = async () => {
    if (!contract) return [];

    try {
      const campaignIds = await contract.getCampaignIds();
      const campaigns = await Promise.all(
        campaignIds.map(async (id) => {
          const campaign = await contract.getCampaignById(id);
          return {
            owner: campaign[0],
            title: campaign[1],
            story: campaign[2],
            target: ethers.formatUnits(campaign[3].toString(), "ether"),
            deadline: campaign[4],
            amountCollected: ethers.formatUnits(campaign[5].toString(), "ether"),
            image: campaign[6],
            donators: campaign[7],
            donations: campaign[8],
            id: id.toString(),
          };
        })
      );
      const sortedCampaigns = campaigns.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    
      setData(sortedCampaigns);
      return campaigns;
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      return [];
    }
  };

  // Get campaigns of the current user only
  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();
    const userCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner.toLowerCase() === currentAccount.toLowerCase()
    );
    setUserCampaignData(userCampaigns);
    return userCampaigns;
  };

  // Function to donate to a campaign
  const donate = async (campaignId, amount) => {
    if (!contract) return;

    try {
      const weiAmount = ethers.parseUnits(amount.toString(), "ether");
      const tx = await contract.donateToCampaign(campaignId, {
        value: weiAmount,
      });
      await tx.wait();
      console.log("Donation successful");
    } catch (error) {
      console.error("Error donating to campaign:", error);
    }
  };

  // Function to get donations for a specific campaign
  const getDonations = async (campaignId) => {
    if (!contract) return;

    try {
      const [donators, donations] = await contract.getDonators(campaignId);
      return donators.map((donator, index) => ({
        donator,
        donation: ethers.formatUnits(donations[index].toString(), "ether"),
      }));
    } catch (error) {
      console.error("Error fetching donations:", error);
      return [];
    }
  };

  // Context value
  const contextValue = {
    currentAccount,
    connectWallet,
    createCampaign,
    getCampaigns,
    getUserCampaigns,
    donate,
    getDonations,
    data,
    userCampaignData,
  };

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
