import React, {Component} from 'react';
import NumberFormat from "react-number-format";

export default class Coin extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                coin: props.coin,
                coinName: props.coinName,
                coinValue: props.coinValue
            }
    }

    render() {
        return (
            <div className="container">
                <div className="row border-bottom mb-2 pt-2 ">
                    <div className="col-sm"><span>{this.state.coin} </span></div>
                    <div className="col-sm"><span>{this.state.coinName} </span></div>
                    <div className="col-sm"><span>{<NumberFormat value={this.state.coinValue} displayType={'text'} thousandSeparator={true} prefix={'$'}/>} </span></div>
                </div>
            </div>
        );
    }

}