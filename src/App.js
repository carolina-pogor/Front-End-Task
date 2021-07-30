import React from 'react';
import image from './currency.png'
import data from './Data.js'
import './App.css'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currencies: data.Valute,
      val1: "",
      val2: "",
      convert: 0.0,
      amount: 0
    }

    // this.state.currencies.splice(0,0,{
    //   "@ID": "0",
    //   "NumCode": "0",
    //   "CharCode": "MDL",
    //   "Nominal": "1",
    //   "Name": "Leu Moldovenesc",
    //   "Value": "1"
    // });

    // this.onSelectCurrency = this.onSelectCurrency.bind(this);
  }
  FindbyID = (id) =>
    this.state.currencies.find(element => element["@ID"] === id)
  directRate = (amount, value, nominal) => amount * (value / nominal);
  reverseRate = (amount, value, nominal) => (amount * nominal) / value;

  compare = (a, b) => {
    if (a.CharCode < b.CharCode) {
      return -1;
    }
    if (a.CharCode > b.CharCode) {
      return 1;
    }
    return 0;
  }

  handleChange1 = (event) => {
    this.setState({ val1: event.target.value })
    this.setState({ amount: 0 })
    this.setState({ convert: 0.0 })
  }
  handleChange2 = (event) => {
    this.setState({ val2: event.target.value })
    this.setState({ amount: 0 })
    this.setState({ convert: 0.0 })
  }
  handleChange3 = (event) => {
    this.setState({ amount: event.target.value })
    const el = event.target.value;
    const currencyA = this.FindbyID(this.state.val1)
    const currencyB = this.FindbyID(this.state.val2)

    if (this.state.val2 !== "0" && this.state.val1 !== "0") {
      const rate = this.directRate(el, currencyA.Value, currencyA.Nominal);
      const reverse = this.reverseRate(rate, currencyB.Value, currencyB.Nominal)

      this.setState({ convert: reverse.toFixed(2) })
    }
    else if (this.state.val2 === "0") {
      const sss2 = this.directRate(el, currencyA.Value, currencyA.Nominal)
      this.setState({ convert: sss2.toFixed(2) })
    }
    else {
      const sss2 = this.reverseRate(el, currencyB.Value, currencyB.Nominal)
      this.setState({ convert: sss2.toFixed(2) })
    }

  }

  render() {
    const valutes = this.state.currencies.sort(this.compare).map(item => { return (<option value={item["@ID"]}>{item.CharCode}</option>) });
    console.log(this.state.currencies)
    return (
      <div>
        <header>

          <img src={image} />
          <h1>Currency Converter</h1>
        </header>
        <div className="content">
          <div className="row row-select-currency">
            <div className="col-md-6 col-md-offset-3">
              <h2>Select Currency</h2>

            </div>
          </div>

          <div className="row">
            <div className="col-sm-6 currency-from-input">
              <h3 className="label1">From</h3>
              {
                //Currency A input
              }
              <div className="input-group">

                <input onChange={this.handleChange3} value={this.state.amount}

                  type="text"
                  className="phone validate"
                  name="phone"
                  maxLength="6" placeholder="Enter amount" />
                <p>
                  <select onChange={this.handleChange1} value={this.state.val1}>
                    <option value="">-- Select --</option>
                    {valutes}
                  </select>

                </p>
              </div>


            </div>
            <div className="col-sm-6 currency-to-input">
              <h3 className="label2">To</h3>
              {
                //Currency B input
              }
              <div className="input-group">

                <input
                  type="text"
                  value={this.state.convert}
                  className="phone validate"
                  name="phone"
                  maxLength="6" disabled placeholder="Enter amount" />
                <p>
                  <select onChange={this.handleChange2} value={this.state.val2}>
                    <option value="">-- Select --</option>
                    {valutes}
                  </select>

                </p>
              </div>

              <div class="convert">
                <button class="btn-convert"
                  type="submit">
                  Convert
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              {
                //Update to currently selected currency
              }
              <p>
                Exchange Rate $ 1 {this.state.cuury} = $ {this.state.sss} USD
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;