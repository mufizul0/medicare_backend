import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

export const authentication = async (req, res, next) => {
  // get token l;from headers

  const authToken = req.headers.authorization;

  //  check token is exist
  if (!authToken || !authToken.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ success: false, message: "No Token , authorization denied" });
  }

  try {
    const token = authToken.split("")[1];

    // verify token

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.Id;
    req.role = decoded.role;

    next(); // must be call the net function
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token is Expired" });
    }
    return res.status(401).json({ success: false, message: "Inviled Token" });
  }
};

export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;

  let user;
  const patient = await User.findById(userId);
  const doctor = await Doctor.findById(userId);

  if (patient) {
    user = patient;
  }
  if (doctor) {
    user = doctor;
  }

  if (!roles.includes(user.role)) {
    return res
      .status(401)
      .json({ sucess: false, message: "You are not authorized" });
  }
  next();
};

//  export const restrict = async User.findById(userId)
