import React from "react";
import axios from "axios";
import Logo from "../Images/logo.png"

class Compare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: "USD",
      target: "INR",
      result: null
    };
  }

  compareCurrencies = () => {
    if (this.state.base !== this.state.target) {
      axios
        .get(`https://api.exchangeratesapi.io/latest?base=${this.state.base}&symbols=${this.state.target}`)
        .then(response => {
          const rate = response.data.rates[this.state.target];
          console.log(response);
          console.log(rate);
          this.setState({ result: rate.toFixed(5) });
        })
        .catch(error => {
          alert(error.message);
        });
    } else {
      alert("Base currency and Target currency can not be same");
      this.setState({ base: "", target: "", result: null });
    }
  };

  render() {
    return (
      <div className="compare">
        <div>
          <img src={Logo} alt="Codingmart Logo" />
        </div>
        <h2>
          <span>Compare Currencies</span>
        </h2>
        <table className="center">
          <tr>
            <td>
              <span>Base Currency:</span>
            </td>
            <td>
              <input name="base" type="text" value={this.state.base} onChange={event => this.setState({ base: event.target.value, result: null })} />
            </td>
          </tr>
          <tr>
            <td>
              <span>Target Currency:</span>
            </td>
            <td>
              <input name="comp" type="text" value={this.state.target} onChange={event => this.setState({ target: event.target.value, result: null })} />
            </td>
          </tr>
        </table>
        <button className="button" onClick={this.compareCurrencies}>COMPARE</button>
        {this.state.result && this.state.base && <h3>1 {this.state.base} = {this.state.result} {this.state.target}</h3>}
      </div>
    );
  }
}

export default Compare;
