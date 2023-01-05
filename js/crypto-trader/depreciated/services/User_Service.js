import http from "../http-common";


const getUser = id => {
    return http.get(`/user/${id}`);
};

const createUser = data => {
    return http.post("/user", data);
};

const updateUser = (id, data) => {
    return http.put(`/user/${id}`, data);
};

const removeUser = id => {
    return http.delete(`/user/${id}`);
};

const findByLoginUser = login => {
    return http.get(`/user/${login}`);
};

export {
    getUser,
    createUser,
    updateUser,
    removeUser,
    findByLoginUser
};