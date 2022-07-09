import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAddress, useMarketplace } from "@thirdweb-dev/react";
import NFTCard from "./NFTCard";

const style = {
  wrapper: `mx-auto bg-gray-100 grid max-w-fit flex-1 grid-cols-1 gap-8 p-10 pt-24 md:grid-cols-2 md:pd-0 lg:grid-cols-3 xl:grid-cols-4 xl:gap-10 2xl:grid-cols-4`,
};

const Listings = () => {
  const [list, setList] = useState([]);
  const marketplace = useMarketplace(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS
  );
  //   console.log(marketplace);

  useEffect(() => {
    getListings();
  }, []);

  const getListings = async () => {
    try {
      const listings = await marketplace.getActiveListings();
      console.log(listings);
      setList(listings);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={style.wrapper}>
      {list.length > 0 ? (
        <>
          {list?.map((listing, index) => (
            <NFTCard listing={listing} key={index} />
          ))}
        </>
      ) : (
        <div className="loadingContainer font-lg h-screen w-screen flex justify-center items-center">
          <h1 className="font-bold text-4xl text-gray-800">Loading...</h1>
        </div>
      )}
    </div>
  );
};

export default Listings;
