import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1d" });
};

export const verifyToken = (payload) => {
  return jwt.verify(payload, process.env.TOKEN_SECRET);
};
