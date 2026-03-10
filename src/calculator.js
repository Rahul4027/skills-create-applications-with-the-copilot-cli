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

const args = process.argv.slice(2);

// Validate input
if (args.length < 3) {
  console.error('Error: Invalid input format.');
  console.error('Usage: calculator.js <number> <operator> <number> [<operator> <number> ...]');
  console.error('\nSupported operators: + (addition), - (subtraction), * (multiplication), / (division), % (modulo), ^ (power), √ (square root)');
  process.exit(1);
}

// Check for valid operators and valid number format
const validOperators = ['+', '-', '*', '/', '%', '^', '√'];
const operators = [];
const numbers = [];

// Parse arguments into numbers and operators
for (let i = 0; i < args.length; i++) {
  if (i % 2 === 0) {
    // Even indices should be numbers
    const num = parseFloat(args[i]);
    if (isNaN(num)) {
      console.error(`Error: "${args[i]}" is not a valid number.`);
      process.exit(1);
    }
    numbers.push(num);
  } else {
    // Odd indices should be operators
    if (!validOperators.includes(args[i])) {
      console.error(`Error: "${args[i]}" is not a valid operator.`);
      console.error('Supported operators: + (addition), - (subtraction), * (multiplication), / (division), % (modulo), ^ (power), √ (square root)');
      process.exit(1);
    }
    operators.push(args[i]);
  }
}

// Validate that we have the correct number of operators
if (operators.length !== numbers.length - 1) {
  console.error('Error: Invalid input format. Expected: <number> <operator> <number> [<operator> <number> ...]');
  process.exit(1);
}

/**
 * Perform arithmetic operations sequentially from left to right
 */
let result = numbers[0];

for (let i = 0; i < operators.length; i++) {
  const operator = operators[i];
  const nextNum = numbers[i + 1];

  // Handle division by zero
  if (operator === '/' && nextNum === 0) {
    console.error('Error: Division by zero is not allowed.');
    process.exit(1);
  }

  // Handle modulo by zero
  if (operator === '%' && nextNum === 0) {
    console.error('Error: Modulo by zero is not allowed.');
    process.exit(1);
  }

  // Handle square root of negative numbers
  if (operator === '√' && result < 0) {
    console.error('Error: Cannot calculate square root of negative numbers.');
    process.exit(1);
  }

  // Perform the operation
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

// Display the result
console.log(`Result: ${result}`);
