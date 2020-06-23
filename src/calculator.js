import React from 'react';
import './calculator.css';
import calculate from './calculate'

export default class Calculator extends React.Component {
  constructor(props){
    super(props);
    this.state={
      input:'0',
      formula:'',
    };
    this.handleClick=this.handleClick.bind(this);
  }

  clearInput(){
    this.setState({
      input:'0',
    });
  }

  clearFormula(){
    this.setState({
      formula:''
    });
  }

  isInputSafe(){
    return this.state.input.length<20;
  }

  isInputZero(){
    return this.state.input==='0';
  }

  isInputDecimal(){
    return this.state.input.includes('.');
  }

  isInputSubtract(){
    return this.state.input.includes('-');
  }

  isInputOperator(){
    return /[+\-X/]/.test(this.state.input);
  }

  isFormulaEmpty(){
    return this.state.formula==='';
  }

  isFormulaLegal(){
    return /[.\d]+[+\-X/]+[.\d]+$/.test(this.state.formula);
  }

  isFormulaResult(){
    return this.state.formula.includes('=');
  }

  isResultNaN(){
    return /NaN/.test(this.state.formula);
  }

  setInputTo(s){
    this.setState({
      input: s
    });
  }

  setFormulaTo(s){
    this.setState({
      formula: s
    });
  }

  concatInputWith(s){
    this.setState({
      input: this.state.input+s
    });
  }

  concatFormulaWith(s){
    this.setState({
      formula:this.state.formula+s
    });
  }

  removeFormulaTailOperator(){
    while(/[+\-X/]$/.test(this.state.formula)){
      this.setState({
        formula:this.state.formula.slice(0, this.state.formula.length-1)
      });
    }
  }

  handleClick(event){
    const clicked=event.target.value;
    switch(true){
      case /[1-9]/.test(clicked):
        if(this.isFormulaResult()) break;
        if(this.isInputOperator()) {
          this.setInputTo('');
        }
        if(this.isInputZero()){
          this.setInputTo('');
        }
        if(this.isInputSafe()){
          this.concatInputWith(clicked);
          this.concatFormulaWith(clicked);
        }
        break;
      case /0/.test(clicked):
        if(this.isFormulaResult()) break;
        if(this.isInputOperator()){
          this.setInputTo('');
        }
        if(this.isInputZero()) break;
        if(this.isInputSafe()){
          this.concatInputWith(clicked);
          this.concatFormulaWith(clicked);
        }
        break;
      case /\./.test(clicked):
        if(this.isFormulaResult()) break;
        if(this.isInputOperator()){
          this.setInputTo('0');
          this.concatFormulaWith('0');
        }
        if(this.isInputDecimal()) break;
        if(this.isInputSafe()){
          this.concatInputWith(clicked);
          this.concatFormulaWith(clicked);
        }
        break;
      case /[+X/]/.test(clicked):
        if(this.isFormulaResult()) {
          if(this.isResultNaN()) break;
          this.setFormulaTo(this.state.input);
        }
        if(this.isFormulaEmpty()) break;
        if(this.isInputOperator()){
          this.removeFormulaTailOperator();
        }
        this.setInputTo(clicked);
        this.concatFormulaWith(clicked);
        break;
      case /-/.test(clicked):
        if(this.isFormulaResult()) {
          if(this.isResultNaN()) break;
          this.setFormulaTo(this.state.input);
        }
        if(this.isInputSubtract()) break;
        this.setInputTo(clicked);
        this.concatFormulaWith(clicked);
        break;
      case /=/.test(clicked):
        if(this.isFormulaResult()) break;
        if(this.isInputOperator()){
          this.removeFormulaTailOperator();
        }
        if(this.isFormulaLegal()){
          let result=calculate(this.state.formula);
          this.setInputTo(result);
          this.concatFormulaWith('='+result);
        }
        break;
      case /clear/.test(clicked):
        this.clearInput();
        this.clearFormula();
        break;
      default:break;
    }
  }

  componentDidMount(){
    const buttons=document.getElementsByTagName("button");
    for(let i=0;i<buttons.length;++i){
      buttons[i].addEventListener("click", this.handleClick);
    }
  }

  componentWillUnmount(){
    const buttons=document.getElementsByTagName("button");
    for(let i=0;i<buttons.length;++i){
      buttons[i].addEventListener("click", this.handleClick);
    }
  }

  render(){
    return (
      <div className="calculator">
        <div id="display">
          <div id="display-formula">{this.state.formula}</div>
          <div id="display-input">{this.state.input}</div>
        </div>
        <div id="buttons">
          <button id="clear" value="clear">AC</button>
          <button id="equals" value="=">=</button>

          <button id="add" value="+">+</button>
          <button id="subtract" value="-">-</button>
          <button id="multiply" value="X">X</button>
          <button id="divide" value="/">/</button>

          <button id="one" value="1">1</button>
          <button id="two" value="2">2</button>
          <button id="three" value="3">3</button>
          <button id="four" value="4">4</button>
          <button id="five" value="5">5</button>
          <button id="six" value="6">6</button>
          <button id="seven" value="7">7</button>
          <button id="eight" value="8">8</button>
          <button id="nine" value="9">9</button>
          <button id="zero" value="0">0</button>
          <button id="decimal" value=".">.</button>
        </div>
      </div>
    );
  }
}
