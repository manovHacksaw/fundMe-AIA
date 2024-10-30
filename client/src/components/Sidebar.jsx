"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navlinks } from "@/constants";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => {
  return (
    <div
      className={`w-[48px] h-[48px] rounded-[10px] ${
        isActive && isActive === name ? "bg-[#2c2f32]" : ""
      } flex justify-center items-center ${
        !disabled ? "cursor-pointer" : "opacity-50"
      } ${styles}`}
      onClick={handleClick}
    >
      <Image
        width={48}
        height={48}
        src={imgUrl}
        alt={name}
        className={`w-1/2 h-1/2 ${isActive !== name ? "grayscale" : ""}`}
      />
    </div>
  );
};

const Sidebar = () => {
  const [isActive, setIsActive] = useState("dashboard");

  const handleClick = (name, link) => {
    if (!navlinks.find((nav) => nav.name === name)?.disabled) {
      setIsActive(name);
    }
  };

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link href="/">
        <Image
          src="./logo.svg"
          width={70}
          height={70}
          className=" p-4 mt-3 rounded-[10px] bg-[#2c2f32]  "
        ></Image>
      </Link>
      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <div
              key={link.name}
              onClick={() => handleClick(link.name, link.link)}
            >
              <Link href={link.link}>
                <Icon
                  name={link.name}
                  imgUrl={link.imgUrl}
                  isActive={isActive}
                  disabled={link.disabled}
                  handleClick={() => handleClick(link.name, link.link)}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
