import store from "@/store/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export default function App({ Component, pageProps }) {
  return (
    <main className={`${poppins.variable} font-sans`}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </main>
  );
}
