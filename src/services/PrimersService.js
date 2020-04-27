import DataFetcher from "./DataFetcher";

const path = "/primers";

export default {
  async getAll() {
    try {
            const data = await DataFetcher.get(path);
            return data;
        }
        catch (error) {
            console.error("Error getting primers:", error);
            return null;
        }
  },
  async add(primer) {
    const addPath = "/add"
    try {
            const returnPrimer = await DataFetcher.post(path+addPath, primer);
            return returnPrimer;
        }
        catch (error) {
            console.error("Error adding primer:", error);
            return null;
        }
  },
  async delete(id) {
    const addPath = "/delete"
    try {
            await DataFetcher.post(path+addPath, id);
            return true;
        }
        catch (error) {
            console.error("Error deleting primer:", error);
            return null;
        }
  },
  async addPair(id1,id2) {
    const addPath = "/pair"
    try {
            await DataFetcher.post(path+addPath, [id1,id2]);
            return true;
        }
        catch (error) {
            console.error("Error adding pair: " + id1 + " - " + id2, error);
            return null;
        }
  },
};
