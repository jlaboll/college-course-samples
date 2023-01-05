import React from 'react';
import axios from 'axios';
import SearchBar from "@bit/lekanmedia.shared-ui.search-bar";
import Coin from "@/coin_feed_search/Coin";

export class CoinFeed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 0,
            allKeys: {},
            idList: [],
            cryptos: [],
            pgLgth: 10
        };
        this.buildReqURI = this.buildReqURI.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.reloadPage = this.reloadPage.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        axios.get('https://min-api.cryptocompare.com/data/all/coinlist')
            .then(res => {
                this.setState({allKeys: res.data.Data});
                Object.keys(this.state.allKeys).map((key) => (
                    this.state.idList.push(this.state.allKeys[key].Symbol)
                ));
                setTimeout(axios.get(this.buildReqURI())
                    .then(res => {
                        const cryptos = res.data;
                        console.log(cryptos);
                        this.setState({cryptos: cryptos});
                    }))
            })
    }

    buildReqURI() {
        let uri = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=';
        for (let i = this.state.pgLgth * this.state.page; i < (this.state.pgLgth * this.state.page) + 10; i++) {
            uri += this.state.idList[i];
            uri += ',';
        }
        uri = uri.substr(0, uri.length - 1);
        return (uri + '&tsyms=USD').toString();
    }

    nextPage() {
        this.setState({page: this.state.page + 1});
        setTimeout(() => this.reloadPage());
    }

    prevPage() {
        if (this.state.page > 0) {
            this.setState({page: this.state.page - 1});
            setTimeout(() => this.reloadPage());
        }

    }

    reloadPage() {
        axios.get(this.buildReqURI())
            .then(res => {
                const cryptos = res.data;
                console.log(cryptos);
                this.setState({cryptos: cryptos});
            })
        setTimeout(() => this.render());

    }

    onCancel = () => {
        this.reloadPage();
    }

    search = (props) => {
        let searchTerm = props;
        let res = getObjects(this.state.allKeys, searchTerm, searchTerm);

        let uri = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=';
        for (let i = 0; i < 10 && i < res.length; i++) {
            uri += res[i];
            uri += ',';
        }
        uri = uri.substr(0, uri.length - 1);
        uri = (uri + '&tsyms=USD').toString();
        axios.get(uri)
            .then(res => {
                const cryptos = res.data;
                console.log(cryptos);
                this.setState({cryptos: cryptos});
            })
        setTimeout(() => this.render());
    }

    render() {

        return (
            <div className="container">
                <div className="col flex-shrink-1" style={{padding: '10px'}}>
                    <h1>Coin Trading</h1>
                    <SearchBar placeholder="Search Coins" onSearch={this.search} cancelSearch={this.onCancel}/>
                </div>
                <div className="container">
                    <div className="row border-bottom">
                        <div className="col-sm"><span>Crypto ID </span></div>
                        <div className="col-sm"><span>Currency Name </span></div>
                        <div className="col-sm"><span>Cost per Unit </span></div>
                    </div>
                </div>
                <div>
                    {Object.keys(this.state.cryptos).map((key) => (
                        <Coin key={key} coin={key} coinValue={this.state.cryptos[key].USD}
                                coinName={this.state.allKeys[key].CoinName}/>
                    ))}
                </div>
                <div>
                    <button style={{padding: '10px'}} onClick={this.prevPage} disabled={this.state.page === 0}>Prev
                    </button>
                    <button onClick={this.nextPage}
                            disabled={this.state.page * this.state.pgLgth >= this.state.idList.length}>Next
                    </button>
                </div>
            </div>

        );
    }
}



function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else
            //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
        if (i == key && obj[i] == val || i == key && val == '') { //
            objects.push(obj);
        } else if (obj[i] == val && key == '') {
            //only add if the object is not already in the array
            if (objects.lastIndexOf(obj) == -1) {
                objects.push(obj);
            }
        }
    }
    return objects;
}

//return an array of values that match on a certain key
function getValues(obj, key) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getValues(obj[i], key));
        } else if (i == key) {
            objects.push(obj[i]);
        }
    }
    return objects;
}

//return an array of keys that match on a certain value
function getKeys(obj, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getKeys(obj[i], val));
        } else if (obj[i] == val) {
            objects.push(i);
        }
    }
    return objects;
}