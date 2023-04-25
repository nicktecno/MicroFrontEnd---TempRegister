import GlobalStyles from "../styles/globals";
import { defaultLayout } from "../jover.json";

import { LangProvider } from "../Context/LangContext";
import { AuthProvider } from "../Context/AuthContext";
import { CartLengthProvider } from "../Context/CartLengthContext";
import { ColorThemeProvider } from "../Context/ColorTheme";
import { LocationProvider } from "../Context/Location";
import { MenuProvider } from "../Context/Menu";
import { ToastContainer } from "react-toastify";
import { ApolloProvider } from "@apollo/client";

import { useApollo } from "../services/apolloSsr";

function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={client}>
      <LangProvider>
        <AuthProvider>
          <CartLengthProvider>
            <ColorThemeProvider>
              <LocationProvider>
                <MenuProvider>
                  <ToastContainer />
                  <GlobalStyles
                    colors={
                      process.env.NEXT_PUBLIC_REACT_APP_MMP_STATE === "true"
                        ? selectedMkt
                        : defaultLayout
                    }
                  />

                  <Component {...pageProps} />
                </MenuProvider>
              </LocationProvider>
            </ColorThemeProvider>
          </CartLengthProvider>
        </AuthProvider>
      </LangProvider>
    </ApolloProvider>
  );
}

export default MyApp;
