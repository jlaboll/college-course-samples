import {BsGraphUp, BsHouseFill, BsInfoCircleFill, BsXOctagonFill, BsPersonFill} from "react-icons/all";
import React from "react";

let items;
items = [
    {
        path: '/',
        name: 'Home',
        id: 'home_item_clickable',
        as: <BsHouseFill/>,
        key: 1
    },
    {
        path: '/about',
        name: 'About',
        id: 'about_item_clickable',
        as: <BsInfoCircleFill/>,
        key: 2
    },
    {
        path: '/live-trading',
        name: 'Trade',
        id: 'trade_item_clickable',
        as: <BsGraphUp/>,
        key: 3
    },
    {
        path: '/profile',
        name: 'My Account',
        id: 'profile_item_clickable',
        as: <BsPersonFill/>,
        key: 4
    },
    {
        path: '/logout',
        name: 'Logout',
        id: 'log_out_item_clickable',
        as: <BsXOctagonFill/>,
        key: 5
    }
// { //Not being used, as this is an error page.
//     path: '/NoMatch',
//     name: 'No Match',
//     as: <BsFillXCircleFill/>,
//     key: 4
// },
]
export default items;