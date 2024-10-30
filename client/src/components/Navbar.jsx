"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CustomButton } from ".";
import Link from "next/link";
import { navlinks } from "@/constants";
import { useStateContext } from "@/context";

const Navbar = () => {
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { currentAccount, connectWallet } = useStateContext();

  const connect = () => {
    connectWallet();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-10 gap-6 mt-4 p-4 bg-[#1c1c24] rounded-lg shadow-lg">
      {/* Search Bar */}
      <div className="lg:flex-1 flex flex-row max-w-[720px] py-2 pl-4 pr-2 h-[52px] bg-[#2c2f32] rounded-full border border-transparent focus-within:border-[#4acd8d] transition duration-300">
        <input
          type="text"
          placeholder="Search for campaigns"
          value={searchQuery}
          onChange={handleSearchChange}
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none focus:border-none"
        />
        <div className="w-[72px] h-full rounded-full bg-[#4acd8d] flex justify-center items-center cursor-pointer hover:bg-[#3db96b] transition duration-300">
          <Image
            src="/search.svg"
            alt="search"
            width={20}
            height={30}
            className="object-contain"
          />
        </div>
      </div>

      {/* Right Side Buttons */}
      <div className="sm:flex hidden flex-row justify-end gap-4">
        {currentAccount ? (
          <Link href="/create-campaign">
            <CustomButton
              btnType="button"
              title={"Create a campaign"}
              styles={
                currentAccount
                  ? "bg-[#1dc071] hover:bg-[#1abc66]"
                  : "bg-[#8c6dfd] hover:bg-[#7457e1]"
              }
            />
          </Link>
        ) : (
          <CustomButton
            btnType="button"
            title={"Connect"}
            styles={
              currentAccount
                ? "bg-[#1dc071] hover:bg-[#1abc66]"
                : "bg-[#8c6dfd] hover:bg-[#7457e1]"
            }
            handleClick={connect}
          />
        )}
        <Link href="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer hover:bg-[#4b5264] transition duration-300">
            <Image
              src="/thirdweb.png"
              alt="user"
              width={31}
              height={31}
              className="object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer hover:bg-[#4b5264] transition duration-300">
          <Image
            src="/logo.svg"
            alt="logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>

        <Image
          src="/menu.svg"
          alt="menu"
          width={34}
          height={34}
          className="object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        {/* Mobile Menu Drawer */}
        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 rounded-lg transition-all duration-300 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          }`}
        >
        <ul className="mb-4">
  {navlinks.map((link) => (
    <li
      key={link.name}
      className={`flex p-4 items-center rounded-lg cursor-pointer hover:bg-[#3a3a43] transition duration-300 ${
        isActive === link.name ? "bg-[#3a3a43]" : ""
      }`}
      onClick={() => {
        setIsActive(link.name);
        setToggleDrawer(false);
        navigate(link.link);
      }}
    >
      <Image
        src={link.imgUrl}
        alt={link.name}
        width={24}
        height={24}
        className={`object-contain ${
          isActive === link.name ? "grayscale-0" : "grayscale"
        }`}
      />
      <p
        className={`ml-[20px] font-epilogue font-semibold text-[14px] transition duration-300 ${
          isActive === link.name ? "text-[#1dc071]" : "text-[#808191]"
        } capitalize`} // Add the 'capitalize' class here
      >
        {link.name}
      </p>
    </li>
  ))}
</ul>

          <div className="flex mx-4">
            <CustomButton
              btnType="button"
              title={currentAccount ? "Create a campaign" : "Connect"}
              styles={
                currentAccount
                  ? "bg-[#1dc071] hover:bg-[#1abc66]"
                  : "bg-[#8c6dfd] hover:bg-[#7457e1]"
              }
              handleClick={() => {
                if (currentAccount) navigate("/create-campaign");
                else connect();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
