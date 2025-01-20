import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-uwmuixrpr6yb67gz.us.auth0.com"
    clientId="0aLXpcYxGlMsZ7w4sk1GqDQKHJVWTngc"
    authorizationParams={{
      redirect_uri: "http://localhost:5173",
    }}
    audience="http://localhost:4000"
    scope="openid profile email"
  >
    <App />
  </Auth0Provider>
);
