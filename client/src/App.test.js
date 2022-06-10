import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('renders learn react link', () => {
    render(<App/>);
    const linkElement = screen.getByText(/Rank how you are feeling today from 0-10/i);
    expect(linkElement).toBeInTheDocument();
});
