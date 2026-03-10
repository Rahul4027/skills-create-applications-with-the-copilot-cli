/**
 * Comprehensive Unit Tests for Calculator
 * 
 * Tests cover:
 * - Addition operations
 * - Subtraction operations
 * - Multiplication operations
 * - Division operations
 * - Edge cases (division by zero, chained operations, decimals)
 */

const {
  add,
  subtract,
  multiply,
  divide,
  calculate,
  isValidOperator,
  VALID_OPERATORS
} = require('../calculatorLib');

describe('Calculator - Addition Operations', () => {
  test('should add two positive numbers (2 + 3)', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('should add two negative numbers', () => {
    expect(add(-5, -3)).toBe(-8);
  });

  test('should add positive and negative numbers', () => {
    expect(add(10, -4)).toBe(6);
  });

  test('should add decimal numbers', () => {
    expect(add(2.5, 3.5)).toBe(6);
  });

  test('should add with zero', () => {
    expect(add(5, 0)).toBe(5);
  });
});

describe('Calculator - Subtraction Operations', () => {
  test('should subtract two positive numbers (10 - 4)', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('should subtract and get negative result', () => {
    expect(subtract(5, 10)).toBe(-5);
  });

  test('should subtract two negative numbers', () => {
    expect(subtract(-5, -3)).toBe(-2);
  });

  test('should subtract decimal numbers', () => {
    expect(subtract(10.5, 4.3)).toBeCloseTo(6.2, 5);
  });

  test('should subtract zero', () => {
    expect(subtract(7, 0)).toBe(7);
  });
});

describe('Calculator - Multiplication Operations', () => {
  test('should multiply two positive numbers (45 * 2)', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('should multiply positive and negative numbers', () => {
    expect(multiply(5, -3)).toBe(-15);
  });

  test('should multiply two negative numbers', () => {
    expect(multiply(-4, -5)).toBe(20);
  });

  test('should multiply decimal numbers', () => {
    expect(multiply(2.5, 4)).toBe(10);
  });

  test('should multiply by zero', () => {
    expect(multiply(10, 0)).toBe(0);
  });

  test('should multiply by one', () => {
    expect(multiply(42, 1)).toBe(42);
  });
});

describe('Calculator - Division Operations', () => {
  test('should divide two positive numbers (20 / 5)', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('should divide and get decimal result', () => {
    expect(divide(10, 4)).toBe(2.5);
  });

  test('should divide positive by negative', () => {
    expect(divide(10, -2)).toBe(-5);
  });

  test('should divide two negative numbers', () => {
    expect(divide(-20, -4)).toBe(5);
  });

  test('should throw error on division by zero', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero is not allowed.');
  });

  test('should divide zero by a number', () => {
    expect(divide(0, 5)).toBe(0);
  });

  test('should divide decimal numbers', () => {
    expect(divide(7.5, 2.5)).toBe(3);
  });
});

describe('Calculator - Chained Operations', () => {
  test('should calculate: 2 + 3 = 5 (from image)', () => {
    const result = calculate([2, 3], ['+']);
    expect(result).toBe(5);
  });

  test('should calculate: 10 - 4 = 6 (from image)', () => {
    const result = calculate([10, 4], ['-']);
    expect(result).toBe(6);
  });

  test('should calculate: 45 * 2 = 90 (from image)', () => {
    const result = calculate([45, 2], ['*']);
    expect(result).toBe(90);
  });

  test('should calculate: 20 / 5 = 4 (from image)', () => {
    const result = calculate([20, 5], ['/']);
    expect(result).toBe(4);
  });

  test('should handle multiple operations left to right: 10 + 5 - 3', () => {
    const result = calculate([10, 5, 3], ['+', '-']);
    expect(result).toBe(12);
  });

  test('should handle multiple operations left to right: 2 * 3 * 5', () => {
    const result = calculate([2, 3, 5], ['*', '*']);
    expect(result).toBe(30);
  });

  test('should handle complex operations: 20 - 8 - 3', () => {
    const result = calculate([20, 8, 3], ['-', '-']);
    expect(result).toBe(9);
  });

  test('should handle operations with division: 100 / 4 / 5', () => {
    const result = calculate([100, 4, 5], ['/', '/']);
    expect(result).toBe(5);
  });

  test('should handle mixed operations: 10 + 5 - 3 * 2 / 2', () => {
    const result = calculate([10, 5, 3, 2, 2], ['+', '-', '*', '/']);
    expect(result).toBe(12);
  });
});

describe('Calculator - Edge Cases', () => {
  test('should throw error on division by zero in chained calculation', () => {
    expect(() => calculate([100, 0], ['/'])).toThrow('Division by zero is not allowed.');
  });

  test('should throw error on invalid operator', () => {
    expect(() => calculate([5, 3], ['%'])).toThrow('Invalid operator: %');
  });

  test('should throw error on mismatched numbers and operators', () => {
    expect(() => calculate([5, 3], ['+', '-'])).toThrow('Invalid number of operators for given numbers');
  });

  test('should handle very large numbers', () => {
    const result = add(1000000, 2000000);
    expect(result).toBe(3000000);
  });

  test('should handle very small numbers', () => {
    const result = multiply(0.0001, 0.0001);
    expect(result).toBeCloseTo(0.00000001, 8);
  });

  test('should handle negative results from subtraction', () => {
    const result = calculate([5, 10], ['-']);
    expect(result).toBe(-5);
  });

  test('should handle decimal precision in division', () => {
    const result = divide(10, 3);
    expect(result).toBeCloseTo(3.333333, 5);
  });
});

describe('Calculator - Operator Validation', () => {
  test('should validate addition operator', () => {
    expect(isValidOperator('+')).toBe(true);
  });

  test('should validate subtraction operator', () => {
    expect(isValidOperator('-')).toBe(true);
  });

  test('should validate multiplication operator', () => {
    expect(isValidOperator('*')).toBe(true);
  });

  test('should validate division operator', () => {
    expect(isValidOperator('/')).toBe(true);
  });

  test('should reject invalid operator', () => {
    expect(isValidOperator('%')).toBe(false);
  });

  test('should reject empty operator', () => {
    expect(isValidOperator('')).toBe(false);
  });

  test('should have all valid operators', () => {
    expect(VALID_OPERATORS).toEqual(['+', '-', '*', '/']);
  });
});
