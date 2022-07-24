import axios from 'axios';
import { Config } from '@config/config';

/**
 * This is a sample api to see how we can add services for APIs
 * and be able to use it in a test.
 */
export class BlogPosts {
  baseURL = Config.blogPostURL;

  async getAllPosts() {
    return await axios
      .get(`${this.baseURL}/posts`)
      .then((response) => response)
      .catch((error) => error.response);
  }

  async getPostsByUser(userId) {
    return await axios
      .get(`${this.baseURL}/posts`, { params: { userId } })
      .then((response) => response)
      .catch((error) => error.response);
  }

  async getPost(id) {
    return await axios
      .get(`${this.baseURL}/posts/${id}`)
      .then((response) => response)
      .catch((error) => error.response);
  }

  async addPost(post) {
    return await axios
      .post(`${this.baseURL}/posts`, post)
      .then((response) => response)
      .catch((error) => error.response);
  }

  async updatePost(post) {
    const { id, ...update } = post;
    return await axios
      .put(`${this.baseURL}/posts/${id}`, update)
      .then((response) => response)
      .catch((error) => error.response);
  }

  async deletePost(id) {
    return await axios
      .delete(`${this.baseURL}/posts/${id}`)
      .then((response) => response)
      .catch((error) => error.response);
  }
}
