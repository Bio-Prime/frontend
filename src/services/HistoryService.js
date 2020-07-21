import DataFetcher from "./DataFetcher";

const path = "/history";

export default {
    async getAll() {
        try {
            const data = await DataFetcher.get(path+"/all");
            return data;
        }
        catch (error) {
            alert("Error getting history:" + error);
            return null;
        }
    },
};
