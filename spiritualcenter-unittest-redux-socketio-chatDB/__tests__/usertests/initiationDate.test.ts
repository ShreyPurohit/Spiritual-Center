import '@testing-library/jest-dom'
import { validateInitiationDate } from '../../lib/helpers/helperFunctions'

const InitiationDateTestValidator = () => {
    const currentDate = new Date();
    const twoMonthsLater = new Date();
    twoMonthsLater.setMonth(currentDate.getMonth() - 3);

    test('it should return error if value is not provided', () => {
        expect(validateInitiationDate('')).toContain('Value Not Provided')
    })
    test('it should return error if value is not valid date', () => {
        expect(validateInitiationDate('abcd')).toContain('Given Value Is Not Valid Date')
    })
    test('it should return error if input date is less than two months from now', () => {
        expect(validateInitiationDate('2023-06-23')).toContain('Initiation Date should be not be less than of last 2 month')
    })
    test("it should return error if input date is greater than today's date", () => {
        expect(validateInitiationDate('2025-03-21')).toContain('Initiation Date should not be greater than today')
    })
    test('it should return true if value is valid date', () => {
        expect(validateInitiationDate('2024-06-23')).toBe(true)
    })
}

InitiationDateTestValidator()