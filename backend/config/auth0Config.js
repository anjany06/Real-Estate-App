// // auth0Config.js
// import { auth } from "express-oauth2-jwt-bearer";
// import { googleSignUpLogin } from "../controllers/userController.js";

// const jwtCheck = auth({
//   audience: "http://localhost:4000",
//   issuerBaseURL: "https://dev-uwmuixrpr6yb67gz.us.auth0.com/",
//   tokenSigningAlg: "RS256",
// });

// const authenticate = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization;
//     console.log(token);
//     if (!token) {
//       return res.status(401).send({ message: "No token provided" });
//     }
//     const decoded = jwtCheck(token);
//     if (!decoded) {
//       return res.status(401).send({ message: "Invalid token" });
//     }
//     const user = await googleSignUpLogin(req, res);
//     if (!user) {
//       return res.status(401).send({ message: "User not found" });
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// };

// export { jwtCheck, authenticate };
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const cookie =
    req.cookies["auth0.TWnkFTDd9To1SnDuQjOHfieY3Xj9nMUp.is.authenticated"];
  if (!cookie) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(cookie, AUTH0_PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
