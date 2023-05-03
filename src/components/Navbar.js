import Link from "next/link";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <nav className="w-full h-[50px] bg-blue-800 px-4 md:px-6 lg:px-10 py-3">
      <div className="flex items-center justify-between">
        <div>
          <Link href={"/"} className="font-semibold text-white">
            Pizza Town
          </Link>
        </div>

        <Link className="relative text-white flex" href={"/Cart"}>
          <AiOutlineShoppingCart className="w-6 h-6" />{" "}
          <span className="absolute left-4 bottom-3 bg-yellow-600 text-black rounded-full w-5 h-5 text-center flex items-center justify-center">
            {cartItems?.length}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
