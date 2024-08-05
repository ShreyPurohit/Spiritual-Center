import { IUser } from "./interfaces";

const getdate = (date: Date): string => {
    return new Date(date).toLocaleDateString();
};

const validateInitiationDate = (value: string) => {
    if (!value) {
        return 'Value Not Provided'
    }
    if (!(new Date(value).getDate() && new Date(value).getMonth() && new Date(value).getFullYear())) {
        return 'Given Value Is Not Valid Date'
    }
    const currentDate = new Date();
    const inputDate = new Date(value);
    const twoMonthsLater = new Date();
    twoMonthsLater.setMonth(currentDate.getMonth() - 3);

    if (inputDate < twoMonthsLater) {
        return "Initiation Date should be not be less than of last 2 month";
    }
    if (inputDate > currentDate) {
        return "Initiation Date should not be greater than today"
    }
    return true;
};

const makeUserName = (initiationDate: string, firstName: string, lastName: string) => {
    let err: string[] = []
    if (!initiationDate) {
        err.push("Initiation Date Not Provided")
    }
    if (!firstName) {
        err.push("First Name Not Provided")
    }
    if (!lastName) {
        err.push("Last Name Not Provided")
    }
    const lletter = lastName.slice(0, 2)
    const fletter = firstName.slice(0, 2)
    const year = new Date(initiationDate).getFullYear()
    const month = new Date(initiationDate).getMonth() + 1
    if (err.length > 0) {
        return err
    }
    return `${year}-${fletter}-${lletter}-${month}`
}


const handleAscending = ({ users, setUsers }: { users: IUser[], setUsers: React.Dispatch<React.SetStateAction<IUser[]>> }) => {
    const sortedAsc = [...users].sort((a, b) => {
        if (a.fullName.firstName.toLowerCase() < b.fullName.firstName.toLowerCase()) {
            return -1;
        }
        if (a.fullName.firstName.toLowerCase() > b.fullName.firstName.toLowerCase()) {
            return 1;
        }
        return 0;
    });
    setUsers(sortedAsc)
};

const handleDescending = ({ users, setUsers }: { users: IUser[], setUsers: React.Dispatch<React.SetStateAction<IUser[]>> }) => {
    const sortedDesc = [...users].sort((a, b) => {
        if (a.fullName.firstName.toLowerCase() > b.fullName.firstName.toLowerCase()) {
            return -1;
        }
        if (a.fullName.firstName.toLowerCase() < b.fullName.firstName.toLowerCase()) {
            return 1;
        }
        return 0;
    });
    setUsers(sortedDesc)
};

const handleSearch = ({ searchInput, users, setUsers, allUsers }: { searchInput: string, users: IUser[], setUsers: React.Dispatch<React.SetStateAction<IUser[]>>, allUsers: IUser[] }) => {
    if (searchInput !== '') {
        const filteredUsers = users.filter(user =>
            user.fullName.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
            user.fullName.middleName.toLowerCase().includes(searchInput.toLowerCase()) ||
            user.fullName.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
            user.username.toLowerCase().includes(searchInput.toLowerCase()) ||
            user.email.toLowerCase().includes(searchInput.toLowerCase()) ||
            user.address.area.toLowerCase().includes(searchInput.toLowerCase())
        );
        if (filteredUsers) {
            setUsers(filteredUsers);
        }
    } else {
        setUsers(allUsers)
    }
};

export { getdate, validateInitiationDate, makeUserName, handleAscending, handleDescending, handleSearch }