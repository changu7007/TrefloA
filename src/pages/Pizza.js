import { PizzaCard } from "@/components/PizzaCard";

const Pizza = ({ pizzas }) => {
  return (
    <div className="py-2 px-4 md:py-2 md:px-6 lg:py-4 lg:px-10 my-auto">
      <PizzaCard pizzas={pizzas} />
    </div>
  );
};

export default Pizza;
