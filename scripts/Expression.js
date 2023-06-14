class Expression{
  constructor(){
    this.firstOperand = ''
    this.secondOperand = ''
    this.operation = ''
    this.HTML = ''
    this.result = ''
  }
  addNumber(num){
    this.HTML += num
    if(!this.operation){
      this.firstOperand += num
    }
    else{
      this.secondOperand += num
    }
  }
  calculate(){
    if(!this.operation) this.result = this.firstOperand
    else{
      let firstNum = parseFloat(this.firstOperand)
      let secondNum = parseFloat(this.secondOperand)
      this.preventFloatingInaccuracy(firstNum, secondNum)
    }
  }
  setOperator(operator){
    if(!this.operation){
      if(this.firstOperand){
        this.operation = operator
        this.HTML += operator
      }
    }
    else{
      if(this.result){
        this.firstOperand = this.result.toString()
        this.secondOperand = ''
        this.operation = operator
        this.HTML = this.result + operator
        this.result = ''
      }
    }
  }
  addDecimal(){
    if(this.firstOperand && !this.operation){
      if(!this.firstOperand.includes('.')){
        this.HTML += '.'
        this.firstOperand += '.'
      }
    }
    else if(this.secondOperand){
      if(!this.secondOperand.includes('.')){
        this.HTML += '.'
        this.secondOperand += '.'
      }
    }
  }
  checkDecimalPlaces(num){
    let numStringified = num.toString()
    let numSplitted = numStringified.split('.')
    if(numSplitted.length == 2){
      let numDecimal = numSplitted[1]
      let numberOfDecimals = numDecimal.length
      return numberOfDecimals
    }
    else return 0
  }
  preventFloatingInaccuracy(firstFloat, secondFloat){
    const numberOfDecimals = [this.checkDecimalPlaces(firstFloat), this.checkDecimalPlaces(secondFloat)]
    const moreDecimals = numberOfDecimals[0] > numberOfDecimals[1] ? numberOfDecimals[0] : numberOfDecimals[1]
    for(let i = 0; i < moreDecimals; i++){
      firstFloat *= 10
      secondFloat *= 10
    }
    switch(this.operation){
      case '+':
        this.result = firstFloat + secondFloat
      break
      case '-':
        this.result = firstFloat - secondFloat
      break
      case 'x':
        this.result = firstFloat * secondFloat
      break
      case ':':
        this.result = firstFloat / secondFloat
      break
    }
    for(let i = 0; i < moreDecimals; i++){
      this.result /= 10
    }
    console.log(this.checkDecimalPlaces(this.result))
    if(this.checkDecimalPlaces(this.result) >= 10) this.result = this.result.toFixed(8)
  }
  remove(removeType){
    if(removeType === 'AC'){
      this.firstOperand = ''
      this.secondOperand = ''
      this.operation = ''
      this.HTML = ''
      this.result = ''
    }
    else{
      this.HTML = this.HTML.slice(0, this.HTML.length - 1)
      if(this.secondOperand)
        this.secondOperand = this.secondOperand.slice(0, this.secondOperand.length - 1)
      else if(this.operation)
        this.operation = ''
      else if(this.firstOperand)
        this.firstOperand = this.firstOperand.slice(0, this.firstOperand.length - 1)
    }
  }
}