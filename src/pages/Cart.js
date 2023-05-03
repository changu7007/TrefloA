import Navbar from "@/components/Navbar";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@/store/cartSlice";
import store from "@/store/store";
import React, { useMemo } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const subTotal = useMemo(() => {
    return cartItems.reduce((total, val) => total + val.onePizzaPrice, 0);
  }, [cartItems]);
  return (
    <Provider store={store}>
      <div>
        <Navbar />
        <div className="px-2 py-2">
          <h1 className="text-lg font-bold py-4">CartItems</h1>
          <div className="flex flex-col lg:flex-row gap-2">
            <div className="w-full hidden md:block lg:w-[70%]">
              <table className="w-full table-auto ">
                <thead className="bg-gray-600 rounded-md rounded-t-md text-gray-100 font-bold uppercase text-xs">
                  <tr>
                    <td className="px-3 py-2 tracking-wide">Product</td>
                    <td className="px-3 py-2 tracking-wide">Price</td>
                    <td className="px-3 py-2 tracking-wide">Quantity</td>
                    <td className="px-3 py-2 tracking-wide">Total</td>
                    <td className="px-3 py-2 tracking-wide">Action</td>
                  </tr>
                </thead>
                <tbody className="bg-gray-200 rounded-md rounded-t-md text-gray-600">
                  {cartItems.map((cartItem, i) => (
                    <tr className="border-b-[1px] border-dashed border-gray-400">
                      <td className="px-3 py-2 whitespace-nowrap">
                        <div className="flex gap-2">
                          <img
                            src={cartItem.img_url}
                            alt={cartItem.name}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                          <div className="flex flex-col items-start justify-between">
                            <h1 className="font-bold text-sm">
                              {cartItem.name}
                            </h1>
                            <div className="flex gap-4">
                              <div>
                                <p className="text-gray-500 my-auto text-xs">
                                  Size
                                </p>
                                <p className=" my-auto text-sm font-semibold">
                                  {cartItem.selectSize}
                                </p>
                              </div>
                              {cartItem.selectToppings && (
                                <div>
                                  <p className="text-gray-500 my-auto text-xs">
                                    Toppings
                                  </p>
                                  <p className=" my-auto text-sm font-semibold">
                                    {cartItem.selectToppings}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2 font-bold whitespace-nowrap">
                        &#8377;{cartItem.price}
                      </td>
                      <td className="px-3 py-2 font-bold whitespace-nowrap">
                        <div className="flex gap-4 px-2 py-2 rounded-sm border-[1px] border-gray-300 w-fit">
                          <span
                            onClick={() => {
                              dispatch(decrementQuantity(cartItem));
                            }}
                            className="cursor-pointer"
                          >
                            -
                          </span>
                          <p>{cartItem.quantity}</p>
                          <span
                            onClick={() => {
                              dispatch(incrementQuantity(cartItem));
                            }}
                            className="cursor-pointer"
                          >
                            +
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-2 font-bold whitespace-nowrap">
                        &#8377;{cartItem.onePizzaPrice}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span
                          onClick={() => {
                            dispatch(removeFromCart(cartItem));
                          }}
                          className="font-bold text-red-500 text-sm cursor-pointer"
                        >
                          Remove Item
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="block md:hidden w-full">
              {cartItems.map((cartItem, i) => (
                <div className="bg-gray-300 rounded-sm px-2 py-1.5 border-b-[1px] mb-2 ">
                  <img
                    src={cartItem.img_url}
                    alt={cartItem.name}
                    className="w-full h-28 object-cover rounded-md"
                  />
                  <div className="flex items-center justify-between py-2">
                    <h1 className="text-xs font-bold">{cartItem.name}</h1>
                    <p
                      onClick={() => {
                        dispatch(removeFromCart(cartItem));
                      }}
                      className="text-red-500 text-xs font-medium cursor-pointer"
                    >
                      Remove
                    </p>
                  </div>
                  <div className="flex items-center justify-between ">
                    <div>
                      <p className="text-gray-500 my-auto text-xs">Size</p>
                      <p className=" my-auto text-xs font-semibold">
                        {cartItem.selectSize}
                      </p>
                    </div>
                    {cartItem.selectToppings && (
                      <div>
                        <p className="text-gray-500 my-auto text-xs">
                          Toppings
                        </p>
                        <p className=" my-auto text-xs font-semibold">
                          {cartItem.selectToppings}
                        </p>
                      </div>
                    )}
                    <div className="flex gap-4 px-2 py-1 rounded-md border-[1px] border-gray-400 w-fit">
                      <span
                        onClick={() => {
                          dispatch(decrementQuantity(cartItem));
                        }}
                        className="cursor-pointer"
                      >
                        -
                      </span>
                      <p>{cartItem.quantity}</p>
                      <span
                        onClick={() => {
                          dispatch(incrementQuantity(cartItem));
                        }}
                        className="cursor-pointer"
                      >
                        +
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-gray-500 my-auto text-xs">MRP</p>
                      <p className=" my-auto text-xs font-semibold">
                        &#8377;{cartItem.price}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 my-auto text-xs">Total</p>
                      <p className=" my-auto text-xs font-semibold">
                        &#8377;{cartItem.onePizzaPrice}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full lg:w-[30%] ">
              <div className="bg-gray-300 rounded-sm px-3 py-2">
                <h1 className="font-bold uppercase text-center pb-4">
                  CheckOut
                </h1>
                <p className="text-xs text-gray-600">Items</p>
                {cartItems.map((cartItem, i) => (
                  <div className="flex items-center justify-between pb-2 ">
                    <span className="text-xs font-semibold">
                      {cartItem.quantity} x {cartItem.name}
                    </span>
                    <p className="text-xs font-semibold">
                      &#8377;{cartItem.onePizzaPrice}
                    </p>
                  </div>
                ))}
                <span className="w-full flex border-b-[1px] border-dashed border-gray-500"></span>
                <div className="flex items-center justify-between py-2 ">
                  <span className="text-sm font-semibold">Total Amount</span>
                  <p className="text-sm font-bold">&#8377;{subTotal}</p>
                </div>
                <button className=" mt-2 px-3 py-2 bg-blue-800 rounded-sm uppercase text-sm w-full text-white font-semibold">
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default Cart;
