import '@testing-library/jest-dom'
import { addUser, removeUser, removeAllUsers } from '@/lib/helpers/chatFunctions.mjs'

const removeUserTests = () => {
    test('it should return error if ID is not provided', () => {
        expect(removeUser('')).toContain("ID Not Provided")
        removeAllUsers()
    })
    test('it should throw error if user does not exists and it tries to remove it from array', () => {
        expect(removeUser(2)).toContain("User Not Found")
        removeAllUsers()
    })
    test('it should return user with the provided ID user', () => {
        addUser({ id: 1, username: "2024-sh-pu-07", room: "partyroom" })
        addUser({ id: 3, username: "2024-la-pu-07", room: "partyroom" })
        expect(removeUser(3)).toEqual({ id: 3, username: "2024-la-pu-07", room: "partyroom" })
        removeAllUsers()
    })
}

removeUserTests()