"use client"; 

import React, { useState, useEffect } from 'react';
import { DisplayCampaigns } from "@/components";
import { useStateContext } from '@/context';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { currentAccount, contract, getUserCampaigns, userCampaignData} = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) {
      fetchCampaigns();
      
    }
  }, [currentAccount, contract]);

  useEffect(() => {
    setCampaigns(userCampaignData); // Set campaigns whenever data changes
  }, [userCampaignData, contract, currentAccount, campaigns]);

  return (
    <DisplayCampaigns 
      title="My Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Profile;
