import axios from "axios";

const getProfile = () => {
    return new Promise((resolve, reject) => {
        axios
            .get("/profile")
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
export default getProfile;
