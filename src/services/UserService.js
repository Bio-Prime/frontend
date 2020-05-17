import DataFetcher from "./DataFetcher";

const path = "/users";

export default {
    async getAll() {
        try {
            const data = await DataFetcher.get(path);
            return data;
        }
        catch (error) {
            console.error("Error getting users:", error);
            return null;
        }
    },
};
