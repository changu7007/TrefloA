import Image from "next/image";
import React from "react";
import pizza from "../asssets/pizza.png";

const Hero = () => {
  return (
    <section className="py-2 px-3 md:py-2 md:px-6 lg:py-4 lg:px-10 my-auto">
      <div className="flex items-center justify-center gap-10 py-4 px-8 bg-black/75 rounded-md">
        <h1 className="text-[32px] md:text-[60px] font-bold text-yellow-500">
          Get Your Favourite Pizza
        </h1>
        <Image
          className="object-contain"
          src={pizza}
          width={60}
          height={60}
          alt="Hero"
        />
      </div>
    </section>
  );
};

export default Hero;
