import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <Toaster position="bottom-right" />
            <Component {...pageProps} />
        </SessionProvider>
    );
}

export default MyApp;
