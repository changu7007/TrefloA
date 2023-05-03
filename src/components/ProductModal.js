import { addToCart } from "@/store/cartSlice";
import React, { useState } from "react";
import { AiFillCloseCircle, AiFillStar } from "react-icons/ai";
import { useDispatch } from "react-redux";

const ProductModal = ({ id, pizza, onClick, handleClose }) => {
  const [selectSize, setSelectSize] = useState("");
  const [selectToppings, setSelectToppings] = useState("");
  const [showErrorSize, setShowErrorSize] = useState(false);
  const [showErrorToppings, setShowErrorToppings] = useState(false);
  const dispatch = useDispatch();
  return (
    <div
      id={id}
      onClick={handleClose}
      className="fixed pt-[200px] pb-10 px-4 md:p-0 overflow-auto inset-0 flex items-center justify-center transition-transform translate-x-0 duration-200 ease-in bg-black bg-opacity-25 backdrop-blur-sm"
    >
      <div
        key={pizza.id}
        className="bg-[#fefffe] w-[350px] px-4 md:px-8 py-4 rounded-md"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-bold text-gray-400 py-4">
            {" "}
            Buy Pizza | {pizza.name} Details
          </h1>
          <AiFillCloseCircle
            onClick={onClick}
            className="text-blue-800 w-5 h-5 cursor-pointer"
          />
        </div>
        <div className="flex flex-col items-start justify-between">
          <img
            src={pizza.img_url}
            alt={pizza.name}
            className="w-full rounded-md object-cover"
          />
          <div className="flex items-center justify-between w-full">
            <h1 className="font-bold text-lg py-3">{pizza.name}</h1>
            {pizza.isVeg === true ? (
              <div className="w-fit  px-2 py-1 bg-green-800 rounded-md text-xs text-green-200 ">
                veg
              </div>
            ) : (
              <div className="w-fit px-2 py-1 bg-red-800 rounded-md text-xs text-red-200 ">
                non-veg
              </div>
            )}
          </div>
          <div className="flex flex-col items-start justify-start pb-3">
            <p className="font-semibold text-xs text-gray-400">Description</p>
            <h1 className="font-semibold text-sm text-gray-600">
              {pizza.description}
            </h1>
          </div>
          <div className="flex items-center justify-between w-full pb-1">
            <p className="font-bold text-base">&#8377; {pizza.price}</p>
            <p className="font-semibold text-base flex items-center justify-center my-auto">
              <AiFillStar className="text-yellow-600 w-6" /> {pizza.rating}
            </p>
          </div>
          <div className="w-full pb-2">
            {pizza?.size?.map((size, i) => (
              <>
                <p className="text-xs text-gray-500 font-semibold py-1">
                  {size.title}
                  {size.isRadio && <span className="text-red-600">*</span>}
                </p>
                <div className="flex items-center justify-between gap-1">
                  {size?.items?.map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        className=""
                        required
                        type="radio"
                        name={selectSize}
                        id={item.size}
                        onChange={(e) => {
                          setSelectSize(e.target.value);
                          setShowErrorSize(false);
                        }}
                        value={item.size}
                      />
                      <label
                        className="text-xs font-semibold"
                        htmlFor={item.size}
                      >
                        {item.size}
                      </label>
                    </div>
                  ))}
                </div>
                {showErrorSize && (
                  <span className="text-xs text-red-600">
                    Please Choose Pizza Size
                  </span>
                )}
              </>
            ))}
          </div>
          <div className="w-full pb-2">
            {pizza?.toppings?.map((topping) => (
              <>
                {topping.isRadio ? (
                  <>
                    <p className="text-xs text-gray-500 font-semibold py-1">
                      {topping.title}
                      {topping.isRadio && (
                        <span className="text-red-600">*</span>
                      )}
                    </p>
                    <div className="flex items-center justify-between gap-1">
                      <select
                        className="w-full rounded-sm text-xs px-2 py-1 outline-none border border-black cursor-pointer "
                        value={selectToppings}
                        onChange={(e) => {
                          setSelectToppings(e.target.value);
                          setShowErrorToppings(false);
                        }}
                      >
                        <option className="text-xs text-gray-500">
                          Choose Any One Toppings
                        </option>
                        {topping?.items?.map((item, i) => (
                          <option
                            key={i}
                            value={item.name}
                            className="text-sm font-semibold"
                          >
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {topping.isRadio && showErrorToppings && (
                      <span className="text-xs text-red-600">
                        Toppings is required for this pizza! Please Choose One
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <p className="text-xs text-gray-500 font-semibold py-1">
                      {topping.title}
                      {topping.isRadio && (
                        <span className="text-red-600">*</span>
                      )}
                    </p>
                    <div className="flex items-center justify-between gap-1">
                      <select
                        className=" w-full rounded-sm text-xs px-2 py-1 outline-none border border-gray-300 "
                        value={selectToppings}
                      >
                        <option className="text-xs text-gray-100">
                          No Toppings Available for this pizza
                        </option>
                      </select>
                    </div>
                    {topping.isRadio && showErrorToppings && (
                      <span className="text-xs text-red-600">
                        Toppings is required for this pizza! Please Choose One
                      </span>
                    )}
                  </>
                )}
              </>
            ))}
          </div>
          {pizza?.toppings?.map((topping) => (
            <>
              {topping.isRadio ? (
                <>
                  <button
                    onClick={() => {
                      if (!selectSize) {
                        setShowErrorSize(true);
                      }
                      if (!selectToppings) {
                        setShowErrorToppings(true);
                      } else {
                        dispatch(
                          addToCart({
                            ...pizza,
                            selectSize,
                            selectToppings,
                            onePizzaPrice: pizza.price,
                          })
                        );
                        onClick();
                      }
                    }}
                    className="bg-blue-700 w-full text-white font-bold px-3 py-2 uppercase rounded-md"
                  >
                    ADD TO CART
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      if (!selectSize) {
                        setShowErrorSize(true);
                      } else {
                        dispatch(
                          addToCart({
                            ...pizza,
                            selectSize,
                            onePizzaPrice: pizza.price,
                          })
                        );
                        onClick();
                      }
                    }}
                    className="bg-blue-700 w-full text-white font-bold px-3 py-2 uppercase rounded-md"
                  >
                    ADD TO CART
                  </button>
                </>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
