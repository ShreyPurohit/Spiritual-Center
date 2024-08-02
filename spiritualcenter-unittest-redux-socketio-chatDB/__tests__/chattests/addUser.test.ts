import '@testing-library/jest-dom'
import { addUser, removeAllUsers } from '@/lib/helpers/chatFunctions.mjs'

const addUserTests = () => {
    test('it should return error if username or room is not provided', () => {
        expect(addUser({ id: 1, username: "", room: "" })).toEqual({ error: "Username And Room Are Required" })
    })

    test('it should return error if user already exists in the room', () => {
        addUser({ id: 1, username: "2024-sh-pu-07", room: "partyroom" })
        expect(addUser({ id: 1, username: "2024-sh-pu-07", room: "partyroom" })).toEqual({ error: "Username Is Already Taken" })
        removeAllUsers()
    })

    test('it should add user if proper input and new user', () => {
        const userObj = {
            id: 1,
            username: "2024-sh-pu-07",
            room: "partyroom"
        }
        expect(addUser({ id: 1, username: "2024-sh-pu-07", room: "partyroom" })).toEqual({ user: userObj })
        removeAllUsers()
    })
}

addUserTests()