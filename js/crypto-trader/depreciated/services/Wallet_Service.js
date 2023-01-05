import http from "../http-common";

const getAllWallet = () => {
    return http.get("/wallet");
};

const getWallet = id => {
    return http.get(`/wallet/${id}`);
};

const createWallet = data => {
    return http.post("/wallet", data);
};

const updateWallet = (id, data) => {
    return http.put(`/wallet/${id}`, data);
};

const removeWallet = id => {
    return http.delete(`/wallet/${id}`);
};

const removeAllWallet = () => {
    return http.delete(`/wallet`);
};

const findByUserIdWallet = user_id => {
    return http.get(`/wallet?user_id=${user_id}`);
};

export {
    getAllWallet,
    getWallet,
    createWallet,
    updateWallet,
    removeWallet,
    removeAllWallet,
    findByUserIdWallet
};