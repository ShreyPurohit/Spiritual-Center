import { handleSearch } from "@/lib/helpers/helperFunctions";

const users: any = [
    { fullName: { firstName: 'Alice', middleName: 'M', lastName: 'Smith' }, username: '2024-al-sm-07', email: 'asmith@example.com', address: { flatNumber: 1, area: 'Area 1', city: "Ahemdabad", state: "Gujarat", pinCode: "418883" } },
    { fullName: { firstName: 'Bob', middleName: 'M', lastName: 'Brown' }, username: '2024-bo-br-07', email: 'bbrown@example.com', address: { flatNumber: 2, area: 'Area 2', city: "Vadodara", state: "Gujarat", pinCode: "123456" } },
    { fullName: { firstName: 'Charlie', middleName: 'M', lastName: 'Davis' }, username: '2024-ch-da-07', email: 'cdavis@example.com', address: { flatNumber: 3, area: 'Area 3', city: "Surat", state: "Gujarat", pinCode: "324456" } }
];

const setUsers = jest.fn()

describe('handleSearch', () => {
    it('should filter users by search input case 1', () => {
        const searchInput = 'alice';
        handleSearch({ searchInput, users, setUsers, allUsers: users });
        expect(setUsers).toHaveBeenCalledWith([
            { fullName: { firstName: 'Alice', middleName: 'M', lastName: 'Smith' }, username: '2024-al-sm-07', email: 'asmith@example.com', address: { flatNumber: 1, area: 'Area 1', city: "Ahemdabad", state: "Gujarat", pinCode: "418883" } }
        ]);
    });

    it('should filter users by search input case 2', () => {
        const searchInput = 'bob';
        handleSearch({ searchInput, users, setUsers, allUsers: users });
        expect(setUsers).toHaveBeenCalledWith([
            { fullName: { firstName: 'Bob', middleName: 'M', lastName: 'Brown' }, username: '2024-bo-br-07', email: 'bbrown@example.com', address: { flatNumber: 2, area: 'Area 2', city: "Vadodara", state: "Gujarat", pinCode: "123456" } }
        ]);
    });

    it('should filter users by search input case 3', () => {
        const searchInput = 'charlie';
        handleSearch({ searchInput, users, setUsers, allUsers: users });
        expect(setUsers).toHaveBeenCalledWith([
            { fullName: { firstName: 'Charlie', middleName: 'M', lastName: 'Davis' }, username: '2024-ch-da-07', email: 'cdavis@example.com', address: { flatNumber: 3, area: 'Area 3', city: "Surat", state: "Gujarat", pinCode: "324456" } }
        ]);
    });

    it('should reset to all users when search input is empty', () => {
        const searchInput = '';
        handleSearch({ searchInput, users, setUsers, allUsers: users });
        expect(setUsers).toHaveBeenCalledWith(users);
    });
});
