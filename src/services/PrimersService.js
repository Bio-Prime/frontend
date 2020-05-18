import DataFetcher from "./DataFetcher";

const path = "/primers";

export default {
  async getAllReceived() {
    try {
            const data = await DataFetcher.get(path+"/received");
            return data;
        }
        catch (error) {
            console.error("Error getting primers:", error);
            return null;
        }
  },
  async getOne(id) {
    try {
        const data = await DataFetcher.get(path+"/get/"+id);
        return data;
    }
    catch (error) {
        console.error("Error getting primer with id" + id + ": ", error);
        return null;
    }
  },
  async getAllOrdered() {
    try {
        const data = await DataFetcher.get(path+"/ordered");
        return data;
    }
    catch (error) {
        console.error("Error getting primers:", error);
        return null;
    }
  },
  async getAllWanted() {
    try {
        const data = await DataFetcher.get(path+"/wanted");
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
  async update(primer) {
    const updatePath = "/update";
    try {
        const id = primer.id;
        const returnPrimer = await DataFetcher.post(path+updatePath+"?id="+id, primer);
        return returnPrimer;
    }
    catch (error) {
        console.error("Error updating primer:", error);
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
