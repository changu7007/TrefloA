import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Pizza from "./Pizza";

export default function Home({ pizzas }) {
  return (
    <main className="">
      <Navbar />
      <Hero />
      <Pizza pizzas={pizzas} />
    </main>
  );
}
const URL = "http://run.mocky.io/v3/ec196a02-aaf4-4c91-8f54-21e72f241b68";
export const getStaticProps = async () => {
  try {
    const res = await fetch(URL);
    const data = await res.json();
    return {
      props: {
        pizzas: data,
      },
    };
  } catch (error) {
    console.log(error);
  }
};
