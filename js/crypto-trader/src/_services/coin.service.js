import { BehaviorSubject } from 'rxjs';

import config from 'config';
import { fetchWrapper, history } from '@/_helpers';

const coinSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/coins`;

export const coinService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    coin: coinSubject.asObservable(),
    get coinValue () { return coinSubject.value }
};

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(coin => {
            // update stored coin if the logged in coin updated their own record
            if (coin.id === coinSubject.value.id) {
                // publish updated coin to subscribers
                coin = { ...coinSubject.value, ...coin };
                coinSubject.next(coin);
            }
            return coin;
        });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
            // auto logout if the logged in coin deleted their own record
            if (id === coinSubject.value.id) {
                logout();
            }
            return x;
        });
}
