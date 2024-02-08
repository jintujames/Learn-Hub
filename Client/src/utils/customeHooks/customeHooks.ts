import {
    Auth,
    signInWithPopup,
  } from "firebase/auth";
  import { UserCredential } from "firebase/auth";
  import {provider} from "../config/firebase.config"


export const useGoogleSignIn = async (auth: Auth): Promise<any> => {
    return new Promise((resolve, reject) => {
      console.log("promise entered");
      signInWithPopup(auth, provider)
        .then((result: UserCredential) => {
          console.log("working");
          resolve({
            status: true,
            userEmail: result.user.email,
            userProfileImageGooleUrl: result.user.photoURL,
            result:result
          });
        })
        .catch((eror: any) => {
          console.log(eror, "error");
          reject(eror);
        });
    });
  };