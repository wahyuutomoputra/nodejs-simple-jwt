const jwt = require("jsonwebtoken");
const ck = require("ckey");

const verifyJWT = ({ roles = [] }) => {
  return function (req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "Unauthorized" });
    // console.log(authHeader); // Bearer token

    const token = authHeader.split(" ")[1];
    jwt.verify(token, ck.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: "Unauthorized" });
      req.user = decoded.username;
      if (roles.length != 0) {
        let haveAccess = false;
        for (const x of roles) {
          if (x == decoded.role) {
            haveAccess = true;
            break;
          }
        }

        if (!haveAccess) {
          return res
            .status(403)
            .json({ message: "Your role does not have access" });
        }
      }

      next();
    });
  };
};

module.exports = verifyJWT;
