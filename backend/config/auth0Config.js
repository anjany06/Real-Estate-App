import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
  audience: "http://localhost:4000",
  issuerBaseURL: "https://dev-uwmuixrpr6yb67gz.us.auth0.com",
  tokenSigningAlg: "RS256",
});

export default jwtCheck;
