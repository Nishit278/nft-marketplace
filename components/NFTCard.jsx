import React from "react";
import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";
import { useMarketplace } from "@thirdweb-dev/react";
import { toast } from "react-hot-toast";

const style = {
  wrapper: `relative flex h-[460px] w-[330px] cursor-pointer flex-col rounded-lg bg-white shadow-lg transition-all duration-400 hover:shadow-2xl dark:bg-[#333333]`,
  imageContainer: `h-3/4 object-cover transition-all duration-800`,
  nftImage: `rounded-t-lg object-cover w-full hover:scale-125 transition-all duration-500`,
  nftLowerContainer: `flex flex-col justify-between h-1/4 p-4`,
  nftInfoContainer: `flex justify-between `,
  collectionTitle: `text-sm text-gray-600 dark:text-gray-400`,
  nftTitle: `text-sm font-bold`,
  priceContainer: `flex justify-between items-end space-y-1 flex-col `,
  priceTtitle: "text-xs font-light",
  wethImageContainer: `flex items-center`,
  nftBottomContainer: `flex justify-between align-center`,
  likesContainer: `flex items-center justify-end space-x-2 `,
  heartIcon: `h-3 w-3 text-gray-500 dark:text-gray-400`,
  likeCounter: `text-sm text-gray-500 dark:text-gray-400`,
  buyButton: `bg-blue-500 rounded-md text-white py-2 px-4 font-bold hover:bg-blue-600`,
};

const NFTCard = ({ listing }) => {
  //   const [loading, setLoading] = useState(false);
  const marketplace = useMarketplace(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS
  );
  const handleBuy = async () => {
    try {
      //   setLoading(true);
      toast.loading("Loading...");
      await marketplace.buyoutListing(listing.id, 1);
      toast.dismiss();
      toast.success("You have successfully purchased this NFT");
      window.location.reload();
    } catch (err) {
      console.error(err);
      //   toast.error("Error buying listing");
    }
  };
  return (
    <div className={style.wrapper}>
      <div className={style.imageContainer}>
        <Image
          src={listing.asset.image}
          alt="nft"
          className={style.nftImage}
          height={340}
          width={330}
        />
      </div>
      <div className={style.nftLowerContainer}>
        <div className={style.nftInfoContainer}>
          <div>
            {listing.asset.collection && (
              <div className={style.collectionTitle}>
                {listing.asset?.collection?.name}
              </div>
            )}
            <div className={style.nftTitle}>{listing.asset.name}</div>
          </div>
          <div className={style.priceContainer}>
            <div className={style.priceTtitle}>Buy at</div>
            <div className={style.wethImageContainer}>
              <Image
                height={16}
                width={16}
                src="/weth-logo.svg"
                alt="weth"
              ></Image>
              <div className={style.priceValue}>
                {listing.buyoutCurrencyValuePerToken.displayValue}
              </div>
            </div>
          </div>
        </div>
        <div className={style.nftBottomContainer}>
          <button className={style.buyButton} onClick={handleBuy}>
            Buy now
          </button>
          <div className={style.likesContainer}>
            <AiOutlineHeart className={style.heartIcon} />
            <div className={style.likeCounter}>
              {listing?.asset?.stats?.favorites ?? 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
