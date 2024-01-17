/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Lemon } from "next/font/google";

const lemon = Lemon({
    subsets: ['latin-ext'],
    weight: '400'
});

const Greeting: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full gap-4 px-4">
      <img
        className="w-24 h-24 object-cover rounded-full"
        src="https://source.unsplash.com/random"
        alt="Unsplash Image"
      />
        <h1 className={`${lemon.className} text-xl italic`}>Welcome to the New Edge HRM!</h1>
    </div>
  );
};

export default Greeting;
