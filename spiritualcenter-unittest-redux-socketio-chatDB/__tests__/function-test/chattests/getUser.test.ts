import '@testing-library/jest-dom'
import { getUser, addUser, removeAllUsers, removeUser } from '@/lib/helpers/chatFunctions.mjs'

const getUserTests = () => {
    test('it should return error if ID is not or empty provided in the params', () => {
        expect(getUser('')).toContain('ID Not Provided')
    })
    test('it should return error if no user with provided id exists in the users array', () => {
        addUser({ id: 1, username: "2024-la-pu-07", room: "partyroom" })
        addUser({ id: 2, username: "2024-sh-pu-07", room: "partyroom" })
        removeUser(1)
        
        expect(getUser(1)).toContain('No User Found With ID 1')
        removeAllUsers()
    })
}

getUserTests()