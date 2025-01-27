import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-uwmuixrpr6yb67gz.us.auth0.com"
    clientId="TWnkFTDd9To1SnDuQjOHfieY3Xj9nMUp"
    authorizationParams={{
      redirect_uri: "https://zenhomes-real-estate.vercel.app",
    }}
    audience="http://localhost:4000"
    scope="openid profile email"
  >
    <MantineProvider>
      <App />
    </MantineProvider>
  </Auth0Provider>
);
