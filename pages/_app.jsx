import "../styles/globals.css";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
      <Toaster/>
        <Component {...pageProps} />{" "}
    </ThirdwebProvider>
  );
}

export default MyApp;
