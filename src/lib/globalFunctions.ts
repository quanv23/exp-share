/**
 * This module contains functions that are used throughout the entire application
 * @module
 */

/**
 * Converts a string representation of a float value to a number type (including converting negative values to positive)
 * @param stringFloat The float string to be converted
 * @returns The positive number representation of the string
 * @example '-12.34' -> 12.34
 */
export function stringFloatToFloat(stringFloat: string): number {
	stringFloat = stringFloat.replace('-', '');
	return parseFloat(stringFloat);
}
