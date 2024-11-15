import prisma from "@/lib/db";
import { postUserZodType } from "../types/user";
export default class UserApi {
  static BASE_URL = "/api/users";
  static async createUser(body: postUserZodType) {
    try {
      const res = await fetch(`${this.BASE_URL}`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      const result = await res.json();
      console.log(result);
      return result.data;
    } catch (error) {
      return error;
    }
  }
}
