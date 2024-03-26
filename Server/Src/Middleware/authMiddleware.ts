import { Request, Response, NextFunction } from "express";
import studentModel from "../Models/studentModel";
import instructorModel from "../Models/instructorModel";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken {
  user_id: string;
  studentEmail:string,
  isBlocked: boolean,
}

export const isLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("ISLOGINNNN");
  try {
    if (!req.headers.authorization) {
      res.status(401).json("Authorization header required");
    } else {
      const token = req.headers.authorization.split(" ")[1];
      console.log("TOKEN IN MIDDLEWARE ==>", token);
      const decode = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken
      console.log("Decoded data" , decode);
      const data = await studentModel.findOne({_id:decode.user_id}) as DecodedToken
      if(data.isBlocked == false){
        next();
      }else{
        res.status(401).json({message:"Blocked by the admin"})
      }
    }
    // if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    //     return res.status(401).json({ error: 'Unauthorized - No token found' });
    // }
    // const token = authorizationHeader.split(' ')[1];
    // if (!token) {
    //     return res.status(401).json({ error: 'Unauthorized - No token found' });
    // }
    // const decoded: JwtPayload | any = jwt.verify(token, process.env.JWT_SECRET as string);
    // let user = await findUser(decoded.user_id);
    // if (!user) {
    //     return res.status(401).json({ error: 'Unauthorized - User not found' });
    // }
    // if (user.isBlocked) {
    //     return res.status(401).json({ error: 'Unauthorized - Account is blocked' });
    // }
    // (req as any).user = user;  //to verify if a user is logged in and attach user information to the request object if the user is authenticated.
    // //console.log(user,"userrrr")
    // next();
  } catch (error) {
    console.error("Error in isLogin middleware:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
