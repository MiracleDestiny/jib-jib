import {
  postPostBookmarkZodType,
  postPostLikeZodType,
  postPostRepostZodType,
  postPostZodType,
} from "../types/post";
export default class PostApi {
  static BASE_URL = "/api/posts";
  static async createPost(body: postPostZodType) {
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
  static async getAllPosts() {
    try {
      const res = await fetch(`${this.BASE_URL}`, {
        method: "GET",
      });

      const json = await res.json();
      console.log(json);
      return json.data;
    } catch (error) {
      return error;
    }
  }
  static async likePost(postID: number, body: postPostLikeZodType) {
    try {
      const res = await fetch(`${this.BASE_URL}/${postID}/like`, {
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

  static async bookmarkPost(postID: number, body: postPostBookmarkZodType) {
    try {
      console.log(postID);
      const res = await fetch(`${this.BASE_URL}/${postID}/bookmark`, {
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

  static async replyPost(postID: number, body: postPostBookmarkZodType) {
    try {
      console.log(postID);
      const res = await fetch(`${this.BASE_URL}/${postID}/bookmark`, {
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
  static async repostPost(postID: number, body: postPostRepostZodType) {
    try {
      console.log(postID);
      const res = await fetch(`${this.BASE_URL}/${postID}/repost`, {
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
}
