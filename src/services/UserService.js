import DataFetcher from "./DataFetcher";

const path = "/users";

export default {
  async getAll() {
    try {
      const data = await DataFetcher.get(path);
      return data;
    } catch (error) {
      alert("Error getting users:" + error);
      return null;
    }
  },
  async getAllUsernames() {
    const usernamesPath = "/usernames";
    try {
      const data = await DataFetcher.get(path + usernamesPath);
      return data;
    } catch (error) {
      alert("Error getting users:" + error);
      return null;
    }
  },
  async add(user) {
    const addPath = "/add";
    try {
      await DataFetcher.postNoReturn(path + addPath, user);
      return true;
    } catch (error) {
      alert("Error adding user:" + error);
      return false;
    }
  },
  async delete(username) {
    const deletePath = "/delete";
    try {
      await DataFetcher.postRawDataNoReturn(path + deletePath, username);
      return true;
    } catch (error) {
      alert("Error deleting user:" + error);
      return false;
    }
  },
};
