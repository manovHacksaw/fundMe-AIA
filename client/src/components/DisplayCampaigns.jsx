import React from 'react'
import { FundCard } from '.'
import { uuidV4 } from 'ethers'

const DisplayCampaigns = ({title, isLoading, campaigns}) => {
  return (
     <div>
     <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({campaigns.length})</h1>

     <div className="flex flex-wrap mt-[20px] gap-[26px]">
       {isLoading && (
         <Image src="/loader.svg" alt="loader" className="w-[100px] h-[100px] object-contain" />
       )}

       {!isLoading && campaigns.length === 0 && (
         <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
           You have not created any campigns yet
         </p>
       )}

       {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundCard 
     //     key={uuidV4()}
         {...campaign}
        
       />)}
     </div>
   </div>
  )
}

export default DisplayCampaigns