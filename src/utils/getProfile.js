import axios from "axios";

const getProfile = () => {
    console.log("Get profile callde ");
    return new Promise((resolve, reject) => {
        axios
            .get("/profile")
            .then((res) => {
                console.log("profile res resolbve");
                resolve(res);
            })
            .catch((err) => {
                reject(err);
                console.log("err");
            });
    });
};
export default getProfile;
