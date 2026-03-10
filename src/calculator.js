#!/usr/bin/env node

/**
 * Node.js CLI Calculator App
 * 
 * Supported Operations:
 * - Addition (+): Add two or more numbers
 * - Subtraction (-): Subtract numbers sequentially
 * - Multiplication (*): Multiply numbers together
 * - Division (/): Divide numbers with zero division error handling
 * - Modulo (%): Calculate the remainder of division
 * - Power (^): Raise a number to a power (exponentiation)
 * - Square Root (√): Calculate the square root of a number
 * 
 * Usage:
 *   calculator.js <number> <operator> <number> [<operator> <number> ...]
 * 
 * Examples:
 *   calculator.js 10 + 5
 *   calculator.js 20 - 8 - 3
 *   calculator.js 4 * 5
 *   calculator.js 100 / 4
 *   calculator.js 10 % 3
 *   calculator.js 2 ^ 8
 *   calculator.js √ 16
 */

const validOperators = ['+', '-', '*', '/', '%', '^', '√'];

/**
 * Parse command-line arguments into numbers and operators
 * @param {Array<string>} args - Command-line arguments
 * @returns {Object} Object with numbers and operators arrays
 * @throws {Error} If input format is invalid
 */
function parseArgs(args) {
  if (args.length < 3) {
    throw new Error('Invalid input format. Usage: calculator.js <number> <operator> <number> [<operator> <number> ...]');
  }

  const operators = [];
  const numbers = [];

  for (let i = 0; i < args.length; i++) {
    if (i % 2 === 0) {
      const num = parseFloat(args[i]);
      if (isNaN(num)) {
        throw new Error(`"${args[i]}" is not a valid number.`);
      }
      numbers.push(num);
    } else {
      if (!validOperators.includes(args[i])) {
        throw new Error(`"${args[i]}" is not a valid operator. Supported: + - * / % ^ √`);
      }
      operators.push(args[i]);
    }
  }

  if (operators.length !== numbers.length - 1) {
    throw new Error('Invalid input format. Expected: <number> <operator> <number> [<operator> <number> ...]');
  }

  return { numbers, operators };
}

/**
 * Perform arithmetic operations sequentially from left to right
 * @param {Array<number>} numbers - Array of numbers
 * @param {Array<string>} operators - Array of operators
 * @returns {number} Result of calculations (may be NaN for sqrt of negative)
 * @throws {Error} If division/modulo by zero
 */
function computeResult(numbers, operators) {
  let result = numbers[0];

  for (let i = 0; i < operators.length; i++) {
    const operator = operators[i];
    const nextNum = numbers[i + 1];

    if (operator === '/' && nextNum === 0) {
      throw new Error('Division by zero is not allowed.');
    }

    if (operator === '%' && nextNum === 0) {
      throw new Error('Modulo by zero is not allowed.');
    }

    switch (operator) {
      case '+':
        result += nextNum;
        break;
      case '-':
        result -= nextNum;
        break;
      case '*':
        result *= nextNum;
        break;
      case '/':
        result /= nextNum;
        break;
      case '%':
        result %= nextNum;
        break;
      case '^':
        result = Math.pow(result, nextNum);
        break;
      case '√':
        result = Math.sqrt(result);
        break;
    }
  }

  return result;
}

/**
 * Main CLI handler
 * @param {Array<string>} args - Command-line arguments
 */
function main(args) {
  try {
    const { numbers, operators } = parseArgs(args);
    const result = computeResult(numbers, operators);
    console.log(`Result: ${result}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Run CLI if called directly
if (require.main === module) {
  main(process.argv.slice(2));
}

// Export functions for use as a module
module.exports = {
  parseArgs,
  computeResult,
  main,
  validOperators
};
