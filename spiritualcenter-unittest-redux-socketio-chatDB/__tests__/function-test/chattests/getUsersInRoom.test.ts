import '@testing-library/jest-dom'
import { getUsersInRoom } from '@/lib/helpers/chatFunctions.mjs'

const getUsersInRoomTests = () => {
    test('it should return error if room is not provided or has empty value', () => {
        expect(getUsersInRoom('')).toContain('Room Not Provided')
    })
}

getUsersInRoomTests()