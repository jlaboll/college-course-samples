import React from 'react';
import { Link } from 'react-router-dom';

import { accountService } from '@/_services';
import {walletService} from "../_services/wallet.service";
import AddWalletModal from "@/wallet/AddWalletModal";

function Details({ match }) {
    const { path } = match;
    const user = accountService.userValue;
    const wallets = walletService.getAllById(user);
    let modalVisibile = false;
    let addModalClose = () => this.modalVisibile = false;
    return (
        <div>
            <h1>My Profile</h1>
            <p>
                <strong>Name: </strong> {user.firstName} {user.lastName}<br />
                <strong>Email: </strong> {user.email}
            </p>
            <button style={{
                hover: {boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'},
                borderRadius: '8px',
                font: 'inherit',
                color: '#fff',
                backgroundColor: '#007bff',
                borderColor: '#007bff'
            }} onClick={()=>modalVisibile = true}>Add Wallet</button>
            <AddWalletModal show={modalVisibile} onHide={addModalClose}/>
            {Object.keys(wallets).map((key) => (
                <>
                    <p key={key}>{wallets[key].walletName}</p>
                    <button>Delete Wallet</button>
                    <button>Wallet Overview</button>
                </>
            ))}
            <p><Link to={`${path}/update`}>Update Profile</Link></p>
        </div>
    );
}

export { Details };