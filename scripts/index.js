const calculatorKeys = document.querySelectorAll('.key')
const expressionEl = document.querySelector('.expression')
const resultEl = document.querySelector('.result')
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const operators = ['+', '-', 'x', ':']
let expression = new Expression()

calculatorKeys.forEach(key => {
  key.addEventListener('click', () => {
    const keyValue = key.innerText
    switch(keyValue){
      case 'AC':
        key.style.backgroundColor = 'rgba(237, 37, 18, .8)'
        setTimeout(() => {
          key.style.backgroundColor = 'rgba(237, 37, 18, .6)'
        }, 120)
      break
      case '=':
        key.style.backgroundColor = 'rgba(57, 251, 5, .8)'
        setTimeout(() => {
          key.style.backgroundColor = 'rgba(57, 251, 5, .6)'
        }, 120)
      break
      default:
        key.style.backgroundColor = 'rgba(255, 255, 255, .85)'
        setTimeout(() => {
          key.style.backgroundColor = 'rgba(255, 255, 255, .70)'
        }, 120)
      break
    }
    executePressedKey(keyValue)
    expressionEl.innerHTML = expression.HTML
    resultEl.innerHTML = expression.result
  })
})

const executePressedKey = key => {
  numbers.forEach(number => {if(key == number) expression.addNumber(key)})
  operators.forEach(operator => {if(key == operator) expression.setOperator(key)})
  if(key == 'DEL' || key == 'AC') expression.remove(key)
  else if(key == '=') expression.calculate()
  else if(key == '.') expression.addDecimal()
}