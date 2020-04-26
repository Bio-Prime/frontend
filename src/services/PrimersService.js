import DataFetcher from "./DataFetcher";

const path = "/primers";

export default {
  async getAllPrimers() {
    try {
            const data = await DataFetcher.get(path);
            return data;
        }
        catch (error) {
            console.error("Error getting primers:", error);
            return null;
        }
  },
};
