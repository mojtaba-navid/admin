
import { screen, fireEvent, render, waitFor } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { login } from './login.api';
import Login from '.';
import { BrowserRouter } from 'react-router-dom';

// Mock the `login` API
jest.mock('./login.api', () => ({
    login: jest.fn(),
}));

// Helper function to wrap the component with required providers
const renderWithProviders = (ui: React.ReactElement) => {
    const queryClient = new QueryClient();
    return render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>{ui}</BrowserRouter>
        </QueryClientProvider>
    );
};

describe('Login Component', () => {
    it('renders the login form', () => {
        renderWithProviders(<Login />);
        expect(screen.getByText(/صفحه ورود/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/شماره تلفن/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/رمز عبور/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /ورود/i })).toBeInTheDocument();
    });

    it('validates the form inputs', async () => {
        renderWithProviders(<Login />);

        fireEvent.click(screen.getByRole('button', { name: /ورود/i }));

        // Check for validation errors
        await waitFor(() => {

            expect(screen.getByText(/شماره تلفن باید حداقل ۱۰ رقم باشد/i)).toBeInTheDocument();
            expect(screen.getByText(/رمز عبور باید حداقل ۶ کاراکتر باشد/i)).toBeInTheDocument();
        });
    });

    it('submits the form with valid data', async () => {
        const mockLoginResponse = { data: { token: 'test-token' } };
        (login as jest.Mock).mockResolvedValue(mockLoginResponse);

        renderWithProviders(<Login />);

        // Fill in the form
        fireEvent.change(screen.getByLabelText(/شماره تلفن/i), {
            target: { value: '09123456789' },
        });
        fireEvent.change(screen.getByLabelText(/رمز عبور/i), {
            target: { value: 'password123' },
        });

        fireEvent.click(screen.getByRole('button', { name: /ورود/i }));

        // Ensure `login` was called with the correct data
        await waitFor(() => {
            expect(login).toHaveBeenCalledWith({
                phoneNumber: '09123456789',
                password: 'password123',
            });
        });

        // Ensure token is saved to localStorage
        await waitFor(() => {
            expect(localStorage.getItem('user')).toEqual(JSON.stringify(mockLoginResponse.data));
        });
    });

    it('handles login error', async () => {
        (login as jest.Mock).mockRejectedValue(new Error('Invalid credentials'));

        renderWithProviders(<Login />);

        fireEvent.change(screen.getByLabelText(/شماره تلفن/i), {
            target: { value: '09123456789' },
        });
        fireEvent.change(screen.getByLabelText(/رمز عبور/i), {
            target: { value: 'wrongpassword' },
        });

        fireEvent.click(screen.getByRole('button', { name: /ورود/i }));

        // Ensure error is logged
        await waitFor(() => {
            expect(screen.queryByText(/error/i)).toBeInTheDocument();
        });
    });
});
