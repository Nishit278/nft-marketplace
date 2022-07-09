import type { NextPage } from "next";
import Head from "next/head";
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import Listings from "../components/Listings";
const style = {
  wrapper: `flex flex-col dark:bg-[#202226] relative h-screen bg-gray-100`,
  btnPrimary: `border border-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-gray-900 hover:text-gray-100`,
};

const Home: NextPage = () => {
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const router = useRouter();
  const auth = () => {
    return (
      <div>
        <button
          onClick={connectWithMetamask}
          className={style.btnPrimary}
          type="button"
        >
          Connect Metamask
        </button>
      </div>
    );
  };
  return (
    <div className={style.wrapper}>
      <Head>
        <title>NFT Marketplace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {address ? <Listings /> : auth()}
    </div>
  );
};

export default Home;
