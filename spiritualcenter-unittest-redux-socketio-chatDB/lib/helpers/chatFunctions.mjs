const users = []

const generateMessage = (username, text) => {
    if (!username) {
        return 'Username Not Provided'
    }
    if (!text) {
        return 'Text Not Provided'
    }
    return {
        username,
        text,
        createdAt: new Date().getTime()
    }
}

const addUser = ({ id, username, room }) => {
    // Clean The Data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()
    // Validate Data
    if (!username || !room) {
        return {
            error: "Username And Room Are Required"
        }
    }
    // Check For Existing User
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })
    // Validate Username
    if (existingUser) {
        return {
            error: "Username Is Already Taken"
        }
    }
    // Store User
    const user = { id, username, room }
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    if (!id) { return "ID Not Provided" }
    const index = users.findIndex((user) => user.id === id)
    if (index !== -1) {
        return users.splice(index, 1)[0]
    } else {
        return "User Not Found"
    }
}

const getUser = (id) => {
    if (!id) { return "ID Not Provided" }
    const matchedUser = users.find((user) => user.id === id)
    if (!matchedUser) { return `No User Found With ID ${id}` }
    return matchedUser
}

const getUsersInRoom = (room) => {
    if (!room) { return "Room Not Provided" }
    return users.filter((user) => user.room === room)
}

// Used For Testing
const removeAllUsers = () => {
    return users.splice(0, users.length)
}
const getAllUsers = () => {
    return users
}

export { generateMessage, addUser, removeUser, getUser, getUsersInRoom, removeAllUsers, getAllUsers }