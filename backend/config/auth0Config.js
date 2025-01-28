// auth0Config.js
import { auth } from "express-oauth2-jwt-bearer";
import { googleSignUpLogin } from "../controllers/userController.js";

const jwtCheck = auth({
  audience: "http://localhost:4000",
  issuerBaseURL: "https://dev-uwmuixrpr6yb67gz.us.auth0.com",
  tokenSigningAlg: "RS256",
});

export const googleAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwtCheck(token);
    const user = await googleSignUpLogin(req, res);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ message: "Invalid token" });
  }
};
export default jwtCheck;
