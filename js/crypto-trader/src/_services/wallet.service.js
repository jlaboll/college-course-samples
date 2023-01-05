import { BehaviorSubject } from 'rxjs';

import config from 'config';
import { fetchWrapper, history } from '@/_helpers';

const walletSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/wallets`;

export const walletService = {
    getAllById,
    getCoinByKey,
    create,
    update,
    delete: _delete,
    wallet: walletSubject.asObservable(),
    get walletValue() {return walletSubject.value}
};

function getAllById(params){
    return fetchWrapper.get(`${baseUrl}/`, params)
        .then(wallet => {
            // update stored wallet if the logged in wallet updated their own record
            if (wallet.id === walletSubject.value.id) {
                // publish updated wallet to subscribers
                wallet = { ...wallet.value, ...wallet };
                wallet.next(wallet);
            }
            return wallet;
        });
}

function getCoinByKey(id, params){
    return fetchWrapper.get(`${baseUrl}/${id}`, params);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(wallet => {
            // update stored wallet if the logged in wallet updated their own record
            if (wallet.id === walletSubject.value.id) {
                // publish updated wallet to subscribers
                wallet = { ...walletSubject.value, ...wallet };
                walletSubject.next(wallet);
            }
            return wallet;
        });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
            // auto logout if the logged in wallet deleted their own record
            if (id === walletSubject.value.id) {
                walletSubject.next(null);
            }
            return x;
        });
}

