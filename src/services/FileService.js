import ADDRESS from "./Address";
import AuthService from "./AuthService";

function handleErrors(response) {
    if (!response.ok) {
        if (response.status === 401) {
            localStorage.removeItem("bioprime-token");
            window.location.reload();
        }
        throw Error(response.statusText);
    }
    return response;
}

export default {
    async uploadCsv(csv) {
        const url = ADDRESS + "/csv/import";

        const formData = new FormData();

        formData.append("file",csv);

        let params = {
            method: "POST",
            body: formData,
        };

        try {
            const response = await fetch(url, AuthService.addTokenToParameters(params));
            await handleErrors(response);
        } catch (error) {
            alert("Error uploading CSV: " + error);
        }

    },
};
