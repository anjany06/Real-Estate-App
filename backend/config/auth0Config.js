const jwtCheck = require("express-oauth2-jwt-bearer");

export const jwtConfig = {
  audience: "http://localhost:4000",
  issuerBaseURL: "https://dev-uwmuixrpr6yb67gz.us.auth0.com",
  tokenSigningAlg: "RS256",
};

export const verifyToken = (req, res, next) => {
  jwtCheck(jwtConfig)(req, res, (err) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }
    const token = req.auth;
    const payload = token.payload;
    // Verify the payload claims
    if (!payload.sub || !payload.email) {
      return res.status(401).send({ message: "Invalid token claims" });
    }
    // ...
    next();
  });
};
