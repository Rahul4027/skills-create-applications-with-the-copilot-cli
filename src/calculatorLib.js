/**
 * Node.js CLI Calculator Module
 * 
 * Supported Operations:
 * - Addition (+): Add two or more numbers
 * - Subtraction (-): Subtract numbers sequentially
 * - Multiplication (*): Multiply numbers together
 * - Division (/): Divide numbers with zero division error handling
 * - Modulo (%): Calculate the remainder of division
 * - Power (^): Raise a number to a power (exponentiation)
 * - Square Root (√): Calculate the square root of a number
 */

const VALID_OPERATORS = ['+', '-', '*', '/', '%', '^', '√'];

/**
 * Perform addition operation
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 */
function add(a, b) {
  return a + b;
}

/**
 * Perform subtraction operation
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Difference of a and b
 */
function subtract(a, b) {
  return a - b;
}

/**
 * Perform multiplication operation
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Product of a and b
 */
function multiply(a, b) {
  return a * b;
}

/**
 * Perform division operation
 * @param {number} a - Dividend
 * @param {number} b - Divisor
 * @returns {number} Quotient of a divided by b
 * @throws {Error} If divisor is zero
 */
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }
  return a / b;
}

/**
 * Perform modulo operation
 * @param {number} a - Dividend
 * @param {number} b - Divisor
 * @returns {number} Remainder of a divided by b
 * @throws {Error} If divisor is zero
 */
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Modulo by zero is not allowed.');
  }
  return a % b;
}

/**
 * Perform exponentiation operation
 * @param {number} base - Base number
 * @param {number} exponent - Exponent
 * @returns {number} base raised to the power of exponent
 */
function power(base, exponent) {
  return Math.pow(base, exponent);
}

/**
 * Calculate square root
 * @param {number} n - Number to calculate square root for
 * @returns {number} Square root of n
 * @throws {Error} If number is negative
 */
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Cannot calculate square root of negative numbers.');
  }
  return Math.sqrt(n);
}

/**
 * Validate if operator is valid
 * @param {string} operator - Operator to validate
 * @returns {boolean} True if operator is valid
 */
function isValidOperator(operator) {
  return VALID_OPERATORS.includes(operator);
}

/**
 * Perform sequential calculations with multiple operators
 * @param {Array<number>} numbers - Array of numbers
 * @param {Array<string>} operators - Array of operators
 * @returns {number} Result of all calculations performed left to right
 * @throws {Error} If invalid operator or division by zero
 */
function calculate(numbers, operators) {
  if (numbers.length !== operators.length + 1) {
    throw new Error('Invalid number of operators for given numbers');
  }

  let result = numbers[0];

  for (let i = 0; i < operators.length; i++) {
    const operator = operators[i];
    const nextNum = numbers[i + 1];

    if (!isValidOperator(operator)) {
      throw new Error(`Invalid operator: ${operator}`);
    }

    switch (operator) {
      case '+':
        result = add(result, nextNum);
        break;
      case '-':
        result = subtract(result, nextNum);
        break;
      case '*':
        result = multiply(result, nextNum);
        break;
      case '/':
        result = divide(result, nextNum);
        break;
      case '%':
        result = modulo(result, nextNum);
        break;
      case '^':
        result = power(result, nextNum);
        break;
      case '√':
        result = squareRoot(result);
        break;
    }
  }

  return result;
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  calculate,
  isValidOperator,
  VALID_OPERATORS
};
