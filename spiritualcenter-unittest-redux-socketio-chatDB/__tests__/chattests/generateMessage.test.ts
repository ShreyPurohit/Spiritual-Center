import '@testing-library/jest-dom'
import { generateMessage } from '@/lib/helpers/chatFunctions.mjs'

const generateMessageTests = () => {
    test("it should return error if username is not provided", () => {
        expect(generateMessage('', 'Hellow')).toContain('Username Not Provided')
    })
    test("it should return error if text is not provided", () => {
        expect(generateMessage('2024-sh-pu-07', '')).toContain('Text Not Provided')
    })
    test('it should return desired output after successfull inputs', () => {
        const outputObj = {
            username: "2024-sh-pu-07",
            text: "Hello",
            createdAt: new Date().getTime()
        }
        expect(generateMessage('2024-sh-pu-07', 'Hello')).toEqual(outputObj)
    })
}

generateMessageTests()