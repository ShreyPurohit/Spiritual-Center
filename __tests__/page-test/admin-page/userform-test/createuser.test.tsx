import AdminUserFormPage from '@/components/admin/UserForm'
import { IUserState } from '@/lib/store/features/Users/userSlice'
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

jest.mock("next/navigation", () => require("next-router-mock"));
jest.mock('react-hot-toast', () => ({
    loading: jest.fn(),
    success: jest.fn(),
    error: jest.fn()
}));

const mockStore = configureStore([])

const initialState: IUserState = {
    loggedInUser: null,
    editUser: null,
    user: [],
    unpaidusers: [],
    loading: false,
    error: null,
    totalUsers: 0,
    totalPages: 0,
    currentPage: 1
}

const store = mockStore(initialState)

describe('create-user-page', () => {
    beforeEach(() => {
        store.clearActions()
    })

    const renderfields = () => {
        render(
            <Provider store={store}>
                <AdminUserFormPage />
            </Provider>
        )
        const fName = screen.getByLabelText('First Name')
        const mName = screen.getByLabelText('Middle Name')
        const lName = screen.getByLabelText('Last Name')
        const email = screen.getByLabelText('Email')
        const initDate = screen.getByLabelText('Initiation Date')
        const fltNum = screen.getByLabelText('Flat Number')
        const area = screen.getByLabelText('Area')
        const city = screen.getByLabelText('City')
        const state = screen.getByLabelText('State')
        const pin = screen.getByLabelText('Pincode')
        const photo = screen.getByLabelText('Photo')
        const submitBtn = screen.getAllByRole('button', { name: "Create User" })[0]
        return {
            fName, mName, lName, email, initDate, fltNum, area, city, state, pin, photo, submitBtn
        }
    }
    describe('initial render', () => {
        it('renders without crashing', () => {
            render(
                <Provider store={store}>
                    <AdminUserFormPage />
                </Provider>
            )
            expect(screen.getByRole('heading', { level: 1, name: "Create User Page" })).toBeInTheDocument()
        })

        it('renders all form fields correctly', () => {
            expect(renderfields().fName).toBeInTheDocument()
            expect(renderfields().mName).toBeInTheDocument()
            expect(renderfields().lName).toBeInTheDocument()
            expect(renderfields().email).toBeInTheDocument()
            expect(renderfields().initDate).toBeInTheDocument()
            expect(renderfields().fltNum).toBeInTheDocument()
            expect(renderfields().area).toBeInTheDocument()
            expect(renderfields().city).toBeInTheDocument()
            expect(renderfields().state).toBeInTheDocument()
            expect(renderfields().pin).toBeInTheDocument()
            expect(renderfields().photo).toBeInTheDocument()
            expect(renderfields().submitBtn).toBeInTheDocument()
        })
    })

    describe('direct click on render', () => {
        it('renders validation errors on submit click without data', async () => {
            fireEvent.click(renderfields().submitBtn)
            await waitFor(() => {
                expect(screen.getByText("First Name is required")).toBeInTheDocument()
                expect(screen.getByText("Middle Name is required")).toBeInTheDocument()
                expect(screen.getByText("Last Name is required")).toBeInTheDocument()
                expect(screen.getByText("Initiation Date is required")).toBeInTheDocument()
                expect(screen.getByText("Flat Number is required")).toBeInTheDocument()
                expect(screen.getByText("Area is required")).toBeInTheDocument()
                expect(screen.getByText("City is required")).toBeInTheDocument()
                expect(screen.getByText("State is required")).toBeInTheDocument()
                expect(screen.getByText("Pincode is required")).toBeInTheDocument()
            })
        })
    })

    describe('blur event', () => {
        it('renders validation errors on blur event', async () => {
            fireEvent.blur(renderfields().fName)
            fireEvent.blur(renderfields().mName)
            fireEvent.blur(renderfields().lName)
            fireEvent.blur(renderfields().email)
            fireEvent.blur(renderfields().initDate)
            fireEvent.blur(renderfields().fltNum)
            fireEvent.blur(renderfields().area)
            fireEvent.blur(renderfields().city)
            fireEvent.blur(renderfields().state)
            fireEvent.blur(renderfields().pin)
            await waitFor(() => {
                expect(screen.getByText("First Name is required")).toBeInTheDocument()
                expect(screen.getByText("Middle Name is required")).toBeInTheDocument()
                expect(screen.getByText("Last Name is required")).toBeInTheDocument()
                expect(screen.getByText("Initiation Date is required")).toBeInTheDocument()
                expect(screen.getByText("Flat Number is required")).toBeInTheDocument()
                expect(screen.getByText("Area is required")).toBeInTheDocument()
                expect(screen.getByText("City is required")).toBeInTheDocument()
                expect(screen.getByText("State is required")).toBeInTheDocument()
                expect(screen.getByText("Pincode is required")).toBeInTheDocument()
            })
        })
    })

    describe('length errors', () => {
        it('renders min length error on text fields', async () => {
            const input = 'a'.repeat(2)
            fireEvent.change(renderfields().fName, { target: { value: input } })
            fireEvent.change(renderfields().mName, { target: { value: input } })
            fireEvent.change(renderfields().lName, { target: { value: input } })
            await waitFor(() => {
                expect(screen.getByText('For First Name minimum 3 char required')).toBeInTheDocument()
                expect(screen.getByText('For Middle Name minimum 3 char required')).toBeInTheDocument()
                expect(screen.getByText('For Last Name minimum 3 char required')).toBeInTheDocument()
            })
        })

        it('renders max length error on text fields', async () => {
            const input = 'a'.repeat(16)
            fireEvent.change(renderfields().fName, { target: { value: input } })
            fireEvent.change(renderfields().mName, { target: { value: input } })
            fireEvent.change(renderfields().lName, { target: { value: input } })
            await waitFor(() => {
                expect(screen.getByText('For First Name maximum 15 char allowed')).toBeInTheDocument()
                expect(screen.getByText('For Middle Name maximum 15 char allowed')).toBeInTheDocument()
                expect(screen.getByText('For Last Name maximum 15 char allowed')).toBeInTheDocument()
            })
        })
    })

    describe('valid name inputs', () => {
        it('renders no error on valid name fields', async () => {
            fireEvent.change(renderfields().fName, { target: { value: "Shrey" } })
            fireEvent.change(renderfields().mName, { target: { value: "Vinod" } })
            fireEvent.change(renderfields().lName, { target: { value: "Purohit" } })
            await waitFor(() => {
                expect(screen.queryByText("First Name is required")).not.toBeInTheDocument()
                expect(screen.queryByText("Middle Name is required")).not.toBeInTheDocument()
                expect(screen.queryByText("Last Name is required")).not.toBeInTheDocument()
                expect(screen.queryByText('For First Name minimum 3 char required')).not.toBeInTheDocument()
                expect(screen.queryByText('For Middle Name minimum 3 char required')).not.toBeInTheDocument()
                expect(screen.queryByText('For Last Name minimum 3 char required')).not.toBeInTheDocument()
                expect(screen.queryByText('For First Name maximum 15 char allowed')).not.toBeInTheDocument()
                expect(screen.queryByText('For Middle Name maximum 15 char allowed')).not.toBeInTheDocument()
                expect(screen.queryByText('For Last Name maximum 15 char allowed')).not.toBeInTheDocument()
            })
        })
    })

    describe('email validation', () => {
        it('renders email validation errors on invalid inputs', async () => {
            const invalidEmails = [
                "abcd",
                "abc@.com",
                "abc@123.456",
                "abc@gmailcom"
            ]
            for (const emails of invalidEmails) {
                fireEvent.change(renderfields().email, { target: { value: emails } })
                await waitFor(() => {
                    expect(emails).not.toMatch(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
                    expect(screen.getByText("Pleae enter valid email")).toBeInTheDocument()
                })
            }
        })
    })

    describe('valid email', () => {
        it('renders no error on valid email field', async () => {
            const validEmail = 'shrey@gmail.com'
            fireEvent.change(renderfields().email, { target: { value: validEmail } })
            await waitFor(() => {
                expect(screen.queryByText("Initiation Date is required")).not.toBeInTheDocument()
                expect(screen.queryByText("Pleae enter valid email")).not.toBeInTheDocument()
            })
        })
    })

    describe('date validation errors', () => {
        it('renders initiation date validation error on date before two months from now', async () => {
            const input = '2024-04-21'
            fireEvent.change(renderfields().initDate, { target: { value: input } })
            await waitFor(() => {
                expect(screen.getByText('Initiation Date should be not be less than of last 2 month')).toBeInTheDocument()
            })
        })

        it('renders initiation date validation error on date after now', async () => {
            const input = '2024-08-23'
            fireEvent.change(renderfields().initDate, { target: { value: input } })
            await waitFor(() => {
                expect(screen.getByText('Initiation Date should not be greater than today')).toBeInTheDocument()
            })
        })
    })

    describe('valid date', () => {
        it('renders no error on valid date value', async () => {
            fireEvent.change(renderfields().initDate, { target: { value: "2024-06-23" } })
            await waitFor(() => {
                expect(screen.queryByText('Initiation Date should be not be less than of last 2 month')).not.toBeInTheDocument()
                expect(screen.queryByText('Initiation Date should not be greater than today')).not.toBeInTheDocument()
            })
        })
    })

    describe('pin code validation error', () => {
        it('renders pin code validation error on invalid alphabetic pincode', async () => {
            const input = 'avcdvg'
            fireEvent.change(renderfields().pin, { target: { value: input } })
            await waitFor(() => {
                expect(screen.getByText("Pincode should not contain non digit characters")).toBeInTheDocument()
            })
        })

        it('renders pin code validation error on invalid pincode < 6 digits', async () => {
            const input = '123'
            fireEvent.change(renderfields().pin, { target: { value: input } })
            await waitFor(() => {
                expect(screen.getByText("For Pincode maximum 6 digit allowed")).toBeInTheDocument()
            })
        })

        it('renders pin code validation error on invalid pincode > 6 digits', async () => {
            const input = '1234567'
            fireEvent.change(renderfields().pin, { target: { value: input } })
            await waitFor(() => {
                expect(screen.getByText("For Pincode maximum 6 digit allowed")).toBeInTheDocument()
            })
        })
    })

    describe('valid pincode', () => {
        it('renders no error on correct Pincode value', async () => {
            fireEvent.change(renderfields().pin, { target: { value: 411003 } })
            await waitFor(() => {
                expect(screen.queryByText("Pincode is required")).not.toBeInTheDocument()
                expect(screen.queryByText("Pincode should not contain non digit characters")).not.toBeInTheDocument()
                expect(screen.queryByText("For Pincode maximum 6 digit allowed")).not.toBeInTheDocument()
            })
        })
    })
}) 