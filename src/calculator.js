import React from 'react';
import './calculator.css';

export default class Calculator extends React.Component {
  constructor(props){
    super(props);
    this.state={
      input:'',
      formula:''
    };
  }

  render(){
    return (
      <div className="calculator">
        <div id="display">
          <div id="display-formula">formula-sample</div>
          <div id="display-input">input-sample</div>
        </div>
        <div id="buttons">
          <button id="clear">AC</button>
          <button id="equals">=</button>

          <button id="add" className="operators">+</button>
          <button id="subtract" className="operators">-</button>
          <button id="multiply" className="operators">X</button>
          <button id="divide" className="operators">/</button>

          <button id="one" className="numbers">1</button>
          <button id="two" className="numbers">2</button>
          <button id="three" className="numbers">3</button>
          <button id="four" className="numbers">4</button>
          <button id="five" className="numbers">5</button>
          <button id="six" className="numbers">6</button>
          <button id="seven" className="numbers">7</button>
          <button id="eight" className="numbers">8</button>
          <button id="nine" className="numbers">9</button>
          <button id="zero" className="numbers">0</button>
          <button id="decimal" className="numbers">.</button>
        </div>
      </div>
    );
  }
}
