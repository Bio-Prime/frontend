import DataFetcher from "./DataFetcher";

const path = "/history";

export default {
    async getAll() {
        try {
            const data = await DataFetcher.get(path);
            return data;
        }
        catch (error) {
            console.error("Error getting history:", error);
            return null;
        }
    },
};
