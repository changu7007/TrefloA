import React, { useState } from "react";
import { AiFillStar, AiOutlineDown } from "react-icons/ai";
import ProductModal from "./ProductModal";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "@/store/cartSlice";

export const PizzaCard = ({ pizzas }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [pizzass, setPizzas] = useState(pizzas);
  const [modal, setModal] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [selected, setSelected] = useState("Filter Pizza Meal");

  const filterCategory = (meal) => {
    const updatedPizzas = pizzass.filter((curPizza) => {
      return curPizza.isVeg === meal;
    });
    setPizzas(updatedPizzas);
  };

  const dropModal = (index) => {
    if (modal === index) setModal(-1);
    else setModal(index);
  };
  const handleClose = (e) => {
    if (e.target.id === "wrapper") setModal(!modal);
  };
  return (
    <div>
      <div className="flex items-end justify-end gap-2 pb-2">
        <div className="cursor-pointer relative flex flex-col w-[160px] gap-2 items-center outline-none  px-3 py-2 bg-gray-300 text-sm font-semibold rounded-sm">
          <div
            onClick={() => setToggle(!toggle)}
            className=" flex gap-2 items-center justify-between w-full"
          >
            <h1>{selected}</h1>
            <AiOutlineDown />
          </div>
          {toggle && (
            <div className="absolute top-9 w-full bg-gray-300 p-1 flex flex-col gap-2 pb-2">
              <p
                onClick={() => {
                  setPizzas(pizzas);
                  setSelected("ALL");
                  setToggle(!toggle);
                }}
                className="text-xs bg-gray-200 rounded-sm px-2 py-1 hover:bg-gray-400 cursor-pointer"
              >
                ALL
              </p>
              <p
                onClick={() => {
                  filterCategory(true);
                  setSelected("Veg Pizzas");
                  setToggle(!toggle);
                }}
                className="text-xs bg-gray-200 rounded-sm px-2 py-1 hover:bg-gray-400 cursor-pointer"
              >
                Veg Pizzas
              </p>
              <p
                onClick={() => {
                  filterCategory(false);
                  setSelected("Non-Veg Pizzas");
                  setToggle(!toggle);
                }}
                className="text-xs bg-gray-200 rounded-sm px-2 py-1 hover:bg-gray-400 cursor-pointer"
              >
                Non-Veg Pizzas
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4">
        {pizzass?.map((pizza, i) => (
          <div
            key={i}
            className="bg-gray-100 w-full flex gap-2 flex-col rounded-md shadow-md py-2 px-2 md:px-4"
          >
            <img
              className="w-full h-[200px] object-cover rounded-md"
              src={pizza?.img_url}
              alt={pizza?.name}
            />
            {pizza?.isVeg === true ? (
              <div className="w-fit  px-2 py-1 bg-green-800 rounded-md text-xs text-green-200 ">
                veg
              </div>
            ) : (
              <div className="w-fit px-2 py-1 bg-red-800 rounded-md text-xs text-red-200 ">
                non-veg
              </div>
            )}
            <h1 className="text-left w-full font-bold text-lg">
              {pizza?.name}
            </h1>
            <div className="flex items-start justify-start">
              <h1 className="font-semibold text-sm text-gray-400">
                {`${pizza?.description?.slice(0, 30)}...`}
              </h1>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-semibold text-sm">&#8377; {pizza?.price}</p>
              <p className="font-semibold text-sm flex items-center justify-center my-auto">
                <AiFillStar className="text-yellow-600 w-6" /> {pizza?.rating}
              </p>
            </div>
            {modal === i && (
              <ProductModal
                modal={modal}
                id="wrapper"
                pizza={pizza}
                handleClose={handleClose}
                onClick={() => setModal(!modal)}
              />
            )}
            {cartItems?.some((cartItem) => cartItem.id === pizza.id) ? (
              <>
                <button
                  key={i}
                  onClick={() => dispatch(removeFromCart(pizza))}
                  className="bg-blue-700 text-white font-bold px-3 py-2 uppercase rounded-md"
                >
                  REMOVE FROM CART
                </button>
              </>
            ) : (
              <>
                <button
                  key={i}
                  onClick={() => dropModal(i)}
                  className="bg-blue-700 text-white font-bold px-3 py-2 uppercase rounded-md"
                >
                  VIEW PIZZA
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
