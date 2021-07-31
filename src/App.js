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

  }
  //disable Amount input while no option is selected
  check = () => {
    if( this.state.val2 !== ''&& this.state.val1 !== '' ) {
      document.getElementById("input").disabled = false;
  }
}

  
  FindbyID = (id) =>
    this.state.currencies.find(element => element["@ID"] === id)
  directRate = (amount, value, nominal) => amount * (value / nominal);
  reverseRate = (amount, value, nominal) => (amount * nominal) / value;
  
  //Sorting list of available currencies
  compare = (a, b) => {
    if (a.CharCode < b.CharCode) {
      return -1;
    }
    if (a.CharCode > b.CharCode) {
      return 1;
    }
    return 0;
  }
//alert user if the input is not a number
  warn= () => {
  if (isNaN(this.state.amount)) {
      return (<p>The input is not a number!</p>) ;
    }
  }
  //onChange events for both dropdowns
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
 
  amountInput = (event) => {
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
        <div id="container">
          
          <div className="content">

            <h3 className="label">Enter the amount</h3>
            {
              //Amount to convert
            }
            <form className="formInput">

              <input onChange={this.amountInput} value={this.state.amount}
               id="input"type="text" className="valInput"
                maxLength="6" disabled  onClick = {this.check()}/>
              <select className="currencySelect" onChange={this.handleChange1} value={this.state.val1}>
                <option value="" ></option>
                {valutes}
              </select>
            
            </form>
            <p>{this.warn()}</p>

            <h3 className="label">BNM currency exchange on 07/29/21</h3>
            {
              //Converted amount
            }
            
            <div className="formInput">

              <input
                type="text"
                value={this.state.convert}
                className="valInput"
                maxLength="6" disabled onClick = {this.check()}/>
              <select className="currencySelect" onChange={this.handleChange2} value={this.state.val2}>
                <option value="" ></option>
                {valutes}
              </select>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;