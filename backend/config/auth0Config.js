import jwt from "jsonwebtoken";

export const jwtConfig = {
  audience: "http://localhost:4000",
  issuerBaseURL: "https://dev-uwmuixrpr6yb67gz.us.auth0.com",
  tokenSigningAlg: "RS256",
};

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  jwt.verify(token, jwtConfig.issuerBaseURL, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }

    req.user = decoded;
    next();
  });
};
