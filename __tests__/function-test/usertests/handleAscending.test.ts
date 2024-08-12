import { handleAscending, handleDescending } from "@/lib/helpers/helperFunctions";

const users: any = [
    { fullName: { firstName: 'Alice', middleName: 'M', lastName: 'Smith' }, username: '2024-al-sm-07', email: 'asmith@example.com', address: { flatNumber: 1, area: 'Area 1', city: "Ahemdabad", state: "Gujarat", pinCode: "418883" } },
    { fullName: { firstName: 'Bob', middleName: 'M', lastName: 'Brown' }, username: '2024-bo-br-07', email: 'bbrown@example.com', address: { flatNumber: 2, area: 'Area 2', city: "Vadodara", state: "Gujarat", pinCode: "123456" } },
    { fullName: { firstName: 'Charlie', middleName: 'M', lastName: 'Davis' }, username: '2024-ch-da-07', email: 'cdavis@example.com', address: { flatNumber: 3, area: 'Area 3', city: "Surat", state: "Gujarat", pinCode: "324456" } }
];

const setUsers = jest.fn()

describe('handleAscending', () => {
    it('should sort users by first name in ascending order', () => {
        handleAscending({ users, setUsers });
        expect(setUsers).toHaveBeenCalledWith([
            { fullName: { firstName: 'Alice', middleName: 'M', lastName: 'Smith' }, username: '2024-al-sm-07', email: 'asmith@example.com', address: { flatNumber: 1, area: 'Area 1', city: "Ahemdabad", state: "Gujarat", pinCode: "418883" } },
            { fullName: { firstName: 'Bob', middleName: 'M', lastName: 'Brown' }, username: '2024-bo-br-07', email: 'bbrown@example.com', address: { flatNumber: 2, area: 'Area 2', city: "Vadodara", state: "Gujarat", pinCode: "123456" } },
            { fullName: { firstName: 'Charlie', middleName: 'M', lastName: 'Davis' }, username: '2024-ch-da-07', email: 'cdavis@example.com', address: { flatNumber: 3, area: 'Area 3', city: "Surat", state: "Gujarat", pinCode: "324456" } }
        ]);
    });
});

describe('handleDescending', () => {
    it('should sort users by first name in descending order', () => {
        handleDescending({ users, setUsers });
        expect(setUsers).toHaveBeenCalledWith([
            { fullName: { firstName: 'Charlie', middleName: 'M', lastName: 'Davis' }, username: '2024-ch-da-07', email: 'cdavis@example.com', address: { flatNumber: 3, area: 'Area 3', city: "Surat", state: "Gujarat", pinCode: "324456" } },
            { fullName: { firstName: 'Bob', middleName: 'M', lastName: 'Brown' }, username: '2024-bo-br-07', email: 'bbrown@example.com', address: { flatNumber: 2, area: 'Area 2', city: "Vadodara", state: "Gujarat", pinCode: "123456" } },
            { fullName: { firstName: 'Alice', middleName: 'M', lastName: 'Smith' }, username: '2024-al-sm-07', email: 'asmith@example.com', address: { flatNumber: 1, area: 'Area 1', city: "Ahemdabad", state: "Gujarat", pinCode: "418883" } }
        ]);
    });
});