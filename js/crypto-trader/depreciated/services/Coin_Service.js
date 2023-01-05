import http from "../http-common";

const getAllCoin = () => {
    return http.get("/coin");
};

const getCoin = id => {
    return http.get(`/coin/${id}`);
};

const createCoin = data => {
    return http.post("/coin", data);
};

const updateCoin = (id, data) => {
    return http.put(`/coin/${id}`, data);
};

const removeCoin = id => {
    return http.delete(`/coin/${id}`);
};

const removeAllCoin = () => {
    return http.delete(`/coin`);
};

const findByWalletIdCoin = wallid => {
    return http.get(`/coin?wallid=${wallid}`);
};

export {
    getAllCoin,
    getCoin,
    createCoin,
    updateCoin,
    removeCoin,
    removeAllCoin,
    findByWalletIdCoin
};