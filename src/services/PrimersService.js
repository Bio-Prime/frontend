
const URL = "http://83.212.82.248:8080/primers";

export default class PrimersService {

    static isUserLoggedIn = () => {
        return localStorage.getItem("loggedIn") === "true";
    };

    static setUserLoggedIn = () => {
        localStorage.setItem("loggedIn", "true");
    };

    static getAllPrimers() {

        let error;
        let items;
        let isLoaded = false;

        fetch(URL,
            {
                method: 'GET',
            })
            .then(res => res.json())
            .then(
                (result) => {

                    items = result;

                    console.log(result);
                },
                (err) => {
                    error = err;

                    console.log(error);
                }
            );

        return [items, error, isLoaded];
    }
}

