import { expect, it, describe } from 'vitest'

import { isOnlyLetters } from '../isOnlyLetters';

describe('isOnlyLetters', () => {
    it('should return an error string with given value which contains not only letters', () => {
        expect(isOnlyLetters('my name 67', 'name')).toBeTruthy()
    });

    it('should return an error string with given value which contains not only letters', () => {
        expect(isOnlyLetters('my67jhgsgd', 'name')).toBeTruthy()
    });

    it('should return an empty string with given value', () => {
        expect(isOnlyLetters('my name', 'name')).toBe('')
    });
})