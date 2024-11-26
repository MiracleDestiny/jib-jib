import { patchUserProfileZodType, postFollowUserZodType, postUserZodType } from "../types/user";
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
  static async getUserPosts(userId: number) {
    try {
      const res = await fetch(`${this.BASE_URL}/${userId}/posts`, {
        method: "GET",
      });
      const result = await res.json();
      console.log(result);
      return result.data;
    } catch (error) {
      return error;
    }
  }

  static async followUser(userID: number, body: postFollowUserZodType) {
    try {
      console.log(userID);
      const res = await fetch(`${this.BASE_URL}/${userID}/follow`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      const json = await res.json();
      console.log(json);
      return json.data;
    } catch (error) {
      return error;
    }
  }

  static async editProfile(userID: number, body: patchUserProfileZodType) {
    try {
      console.log(userID);
      const res = await fetch(`${this.BASE_URL}/${userID}/profile`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
      const json = await res.json();
      console.log(json);
      return json.data;
    } catch (error) {
      return error;
    }
  }
}
