import { postAuthSignInZodType, postAuthSignInZodResult } from "../types/auth";

export default class AuthApi {
  static BASE_URL = "/api/auth";
  static async signIn(body: postAuthSignInZodType) {
    try {
      console.log("body");
      const res = await fetch(`${this.BASE_URL}/signin`, {
        method: "POST",
        body: JSON.stringify(body),
        credentials: "include",
      });
      const result = (await res.json()) as postAuthSignInZodResult;
      console.log(result);
      if (result) return result.data;
      else return null;
    } catch (error) {
      return error;
    }
  }
}
