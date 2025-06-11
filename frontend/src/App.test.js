import { render, screen } from '@testing-library/react';
import App from './App';

test('renders user application header', () => {
    render(<App />);
    const header = screen.getByText(/User Application/i);
    expect(header).toBeInTheDocument();
});
