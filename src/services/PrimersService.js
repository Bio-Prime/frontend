import DataFetcher from "./DataFetcher";

const path = "/primers";

export default {
  async getAllReceived() {
    try {
            const data = await DataFetcher.get(path+"/received");
            return data;
        }
        catch (error) {
            alert("Error getting primers:" + error);
            return null;
        }
  },
  async getOne(id) {
    try {
        const data = await DataFetcher.get(path+"/get/"+id);
        return data;
    }
    catch (error) {
        alert("Error getting primer with id" + id + ": " + error);
        return null;
    }
  },
  async getPrimerJsonExample() {
    try {
        const data = await DataFetcher.get(path+"/primerjson-example");
        return data;
    }
    catch (error) {
        alert("Error getting primer json example" + error);
        return null;
    }
  },
  async getAllOrdered() {
    try {
        const data = await DataFetcher.get(path+"/ordered");
        return data;
    }
    catch (error) {
        alert("Error getting primers:" + error);
        return null;
    }
  },
  async getAllWanted() {
    try {
        const data = await DataFetcher.get(path+"/wanted");
        return data;
    }
    catch (error) {
        alert("Error getting primers:" + error);
        return null;
    }
  },
  async add(primer) {
    const addPath = "/add"
    try {
        return await DataFetcher.post(path + addPath, primer);
        }
        catch (error) {
            alert("Error adding primer:" + error);
            return null;
        }
  },
  async update(primer) {
    const updatePath = "/update";
    try {
        const id = primer.id;
        return await DataFetcher.post(path + updatePath + "?id=" + id, primer);
    }
    catch (error) {
        alert("Error updating primer:" + error);
        return null;
    }
  },
    async updateAmountCommentAnalysis(primer) {
        const updatePath = "/updateAmountCommentAnalysisi";
        try {
            const id = primer.id;
            return await DataFetcher.post(path + updatePath + "?id=" + id, primer);
        }
        catch (error) {
            alert("Error updating primer amount/comment/analysis:" + error);
            return null;
        }
    },
  async delete(id) {
    const deletePath = "/delete"
    try {
            await DataFetcher.postNoReturn(path+deletePath, id);
            return true;
        }
        catch (error) {
            alert("Error deleting primer:" + error);
            return null;
        }
  },
  async addPair(primer1,primer2) {
    const addPairPath = "/pair"
    try {
            await DataFetcher.post(path+addPairPath, [primer1.id,primer2.id]);
            return true;
        }
        catch (error) {
            alert("Error adding pair: " + error);
            return null;
        }
  },
  async getAllForeignTables() {
    try {
            const data = await DataFetcher.get(path+"/get-all-foreign-tables");
            return data;
        }
        catch (error) {
            alert("Error getting foreign tables:" + error);
            return null;
        }
  },
};
