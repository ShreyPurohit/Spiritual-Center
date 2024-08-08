import LoginPage from '@/app/login/page'
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

describe('login-page', () => {
    beforeEach(() => {
        store.clearActions()
    })

    it('renders without crashing', () => {
        render(
            <Provider store={store}>
                <LoginPage />
            </Provider>
        )
        expect(screen.getAllByAltText('company-logo')[0]).toBeInTheDocument()
        expect(screen.getByText('LOGIN USER')).toBeInTheDocument()
    })

    it('renders all form fields correctly', async () => {
        render(
            <Provider store={store}>
                <LoginPage />
            </Provider>
        )
        expect(screen.getByLabelText('Username')).toBeInTheDocument()
        expect(screen.getByLabelText('Password')).toBeInTheDocument()
        expect(screen.getByLabelText('Role')).toBeInTheDocument()
        fireEvent.click(screen.getByLabelText('Role'))
        await waitFor(() => {
            expect(screen.getByRole('option', { name: "Select Role" })).toBeInTheDocument()
            expect(screen.getByRole('option', { name: "Admin" })).toBeInTheDocument()
            expect(screen.getByRole('option', { name: "Devotee" })).toBeInTheDocument()
        })
    })

    it('shows empty validation errors when fields are empty and form is submitted', async () => {
        render(
            <Provider store={store}>
                <LoginPage />
            </Provider>
        )
        fireEvent.click(screen.getByText('Submit Credential'))
        await waitFor(() => {
            expect(screen.getByText("Username is required")).toBeInTheDocument()
            expect(screen.getByText("Password is required")).toBeInTheDocument()
            expect(screen.getByText("Role is required")).toBeInTheDocument()
        })
    })

    it('renders otp field when role is "devotee"', async () => {
        render(
            <Provider store={store}>
                <LoginPage />
            </Provider>
        )
        fireEvent.change(screen.getByLabelText('Role'), { target: { value: 'devotee' } })
        expect(screen.getByLabelText("Otp")).toBeInTheDocument()
    })

    it('does not renders otp field when role is "admin"', async () => {
        render(
            <Provider store={store}>
                <LoginPage />
            </Provider>
        )
        fireEvent.change(screen.getByLabelText('Role'), { target: { value: 'admin' } })
        expect(screen.queryByLabelText("Otp")).not.toBeInTheDocument()
    })

    it('renders otp required error when role is devotee and Otp is not provided before submission', async () => {
        render(
            <Provider store={store}>
                <LoginPage />
            </Provider>
        )
        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'testpassword' } });
        fireEvent.change(screen.getByLabelText('Role'), { target: { value: 'devotee' } })

        expect(screen.getByLabelText("Otp")).toBeInTheDocument()
        fireEvent.click(screen.getByRole('button'))

        await waitFor(() => {
            expect(screen.getByText('Otp is required')).toBeInTheDocument()
        })
    })

    it('does not render errors when all fields are given for admin', async () => {
        render(
            <Provider store={store}>
                <LoginPage />
            </Provider>
        )
        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'admin' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'admin' } });
        fireEvent.change(screen.getByLabelText('Role'), { target: { value: 'admin' } })
        fireEvent.click(screen.getByRole('button'))
        await waitFor(() => {
            expect(screen.queryByLabelText("Otp")).not.toBeInTheDocument()
            expect(screen.queryByLabelText("Username is required")).not.toBeInTheDocument()
            expect(screen.queryByLabelText("Password is required")).not.toBeInTheDocument()
            expect(screen.queryByLabelText("Role is required")).not.toBeInTheDocument()
        })
    })
})