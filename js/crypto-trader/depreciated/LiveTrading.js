import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Wallet from '../src/wallet/Wallet'


export function LiveTrading(){
    const [coinlist, addCoin] = useState([])
    const [crypto, addCrypto] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    addCoin(coin => [...coinlist, coin])
    addCrypto(coin => [...crypto, coin])

    useEffect( () => {
        const fetchCoins = async () => {
            setIsLoading(true);
            const result = await axios.get(
                'https://min-api.cryptocompare.com/data/all/coinlist',
            );
            result.data.Data.map(key => (
                addCoin(key.Symbol)
            ));
        };
        const fetchCryptos = async (item) =>{
            const result = await axios.get('https://min-api.cryptocompare.com/data/price?fsyms=' + item + '&tsyms=USD',);
            addCrypto(result.data);
        };
        fetchCoins();
        coinlist.map(key =>
            fetchCryptos(key)
        );
        setIsLoading(false);
    }, []);

        return (
            <div className="container">
                {/*<ul>*/}
                {/*    {coinlist.Data.map(item => (*/}
                {/*        <li key = {item}>*/}
                {/*            <a href={'https://min-api.cryptocompare.com/data/price?fsyms=' + item.Symbol + '&tsyms=USD'}>{item.Symbol}</a>*/}
                {/*        </li>*/}
                {/*    ))}*/}
                {/*</ul>*/}
                <h1>Coin Trading</h1>
                {/*<button onClick={() => loadCoins()}>Refresh</button>*/}
                {isLoading ? (
                    <div>Loading ...</div>
                ) :<div>
                    {Object.keys(crypto).map((key) => (
                        <Wallet key={key} coin={key} coinValue={crypto[key].USD}/>
                    ))}
                </div>}
            </div>

        );

}