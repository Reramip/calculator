const getPriority = operator => {
  return /[X/]/.test(operator)?1:0;
}

// num1: string, num2: string, op: string
const doCalc = (num1, num2, op) => {
  let a=Number(num1);
  let b=Number(num2);
  switch(op){
    case '+':
      return a+b;
    case '-':
      return a-b;
    case 'X':
      return a*b;
    case '/':
      if(b===0) return NaN;
      return a/b;
    default: return NaN;
  }
}

// expression: string 2X5+9/-2
const calculate = expression => {
  const numbers = expression.split(/[+\-X/]+/);
  const operators = expression.split(/[.\d]+/);
  let i=2, j=2;
  let numStack=[];
  let opStack=[];
  numStack.push(operators[0].length>0?'-'+numbers[0]:numbers[0]);
  numStack.push(operators[1].length>1?'-'+numbers[1]:numbers[1]);
  opStack.push(operators[1].charAt(0));
  while(j<operators.length-1){
    let opTopPriority=getPriority(opStack[opStack.length-1]);
    let nextPriority=getPriority(operators[j].charAt(0));
    if(nextPriority>opTopPriority){
      let num1=numStack.pop();
      let num2 = operators[j].length>1?'-'+numbers[i]:numbers[i];
      let op=operators[j].charAt(0);
      numStack.push(doCalc(num1, num2, op));
    }else{
      numStack.push(operators[j].length>1?'-'+numbers[i]:numbers[i]);
      opStack.push(operators[j].charAt(0));
    }
    ++i; ++j;
  }
  let result=numStack.shift();
  while(opStack.length>0){
    let num=numStack.shift();
    let op=opStack.shift();
    result=doCalc(result,num,op);
  }
  return result.toString();
};

export default calculate;