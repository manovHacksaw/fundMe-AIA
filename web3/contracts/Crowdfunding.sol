// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Crowdfunding {
    // Struct to store details of each crowdfunding campaign
    struct Campaign {
        address owner; // Owner of the campaign
        string title; // Title of the campaign
        string description; // Description of the campaign
        uint256 target; // Funding target in wei
        uint256 deadline; // Deadline for the campaign (timestamp)
        uint256 amountCollected; // Total amount collected so far
        string image; // URL to the campaign image
        address[] donators; // List of addresses that donated
        uint256[] donations; // List of amounts donated by each address
    }

    // Mapping to store campaigns with a unique ID
    mapping(uint256 => Campaign) public campaigns;

    // Counter to keep track of the number of campaigns created
    uint256 public numberOfCampaigns = 0;

    // Event to emit when a new campaign is created
    event CampaignCreated(
        uint256 indexed campaignId,
        address indexed owner,
        string title,
        uint256 target,
        uint256 deadline,
        string image
    );

    // Function to create a new campaign
    function createCampaign(
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        require(_deadline > block.timestamp, "Deadline must be in the future");

        // Create a new campaign and store it in the campaigns mapping
        Campaign storage campaign = campaigns[numberOfCampaigns];
        campaign.owner = msg.sender;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        // Emit the campaign creation event
        emit CampaignCreated(
            numberOfCampaigns,
            msg.sender,
            _title,
            _target,
            _deadline,
            _image
        );

        // Increment the campaign counter
        numberOfCampaigns++;

        // Return the ID of the newly created campaign
        return numberOfCampaigns - 1;
    }

    // Function to donate to a campaign
    function donateToCampaign(uint256 _id) public payable {
        require(msg.value > 0, "Donation must be greater than 0");

        // Retrieve the campaign from the mapping
        Campaign storage campaign = campaigns[_id];

        require(block.timestamp < campaign.deadline, "Campaign has ended");

        // Add the donor's address and donation amount to the campaign
        campaign.donators.push(msg.sender);
        campaign.donations.push(msg.value);

        // Transfer the donation to the campaign owner
        (bool sent, ) = payable(campaign.owner).call{value: msg.value}("");
        require(sent, "Failed to send Ether");

        // Update the amount collected
        campaign.amountCollected += msg.value;
    }

    // Function to get the list of donors and their corresponding donations for a campaign
    function getDonators(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    // Function to retrieve all campaign IDs
    function getCampaignIds() public view returns (uint256[] memory) {
        uint256[] memory ids = new uint256[](numberOfCampaigns);
        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            ids[i] = i;
        }
        return ids;
    }

    // Function to retrieve detailed information for a specific campaign by ID
    function getCampaignById(
        uint256 _id
    )
        public
        view
        returns (
            address owner,
            string memory title,
            string memory description,
            uint256 target,
            uint256 deadline,
            uint256 amountCollected,
            string memory image,
            address[] memory donators,
            uint256[] memory donations
        )
    {
        Campaign storage campaign = campaigns[_id];
        return (
            campaign.owner,
            campaign.title,
            campaign.description,
            campaign.target,
            campaign.deadline,
            campaign.amountCollected,
            campaign.image,
            campaign.donators,
            campaign.donations
        );
    }
}
