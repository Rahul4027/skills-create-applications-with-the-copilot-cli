/**
 * Node.js CLI Calculator Module
 * 
 * Supported Operations:
 * - Addition (+): Add two or more numbers
 * - Subtraction (-): Subtract numbers sequentially
 * - Multiplication (*): Multiply numbers together
 * - Division (/): Divide numbers with zero division error handling
 */

const VALID_OPERATORS = ['+', '-', '*', '/'];

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
    }
  }

  return result;
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  calculate,
  isValidOperator,
  VALID_OPERATORS
};
