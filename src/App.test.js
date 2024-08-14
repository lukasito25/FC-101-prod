import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from './Dashboard';

// Mock the fetch function globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ entries: [] }),
  })
);

test('renders Training Dashboard and adds a new entry', async () => {
  // Update the mock for adding an entry
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve({ id: 1 }),
    })
  );

  render(<Dashboard />);

  // Check if the header and form elements are present
  expect(screen.getByText('Training Dashboard')).toBeInTheDocument();
  expect(screen.getByLabelText('Name:')).toBeInTheDocument();
  expect(screen.getByLabelText('Team:')).toBeInTheDocument();
  expect(screen.getByLabelText('Date:')).toBeInTheDocument();

  // Fill out the form
  fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'Test User' } });
  fireEvent.change(screen.getByLabelText('Team:'), { target: { value: 'Team A' } });
  fireEvent.change(screen.getByLabelText('Date:'), { target: { value: '2023-08-13' } });

  // Update the mock for fetching entries after adding
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve({ entries: [{ id: 1, name: 'Test User', team: 'Team A', date: '2023-08-13' }] }),
    })
  );

  // Submit the form
  fireEvent.click(screen.getByText('Add Entry'));

  // Wait for the new entry to appear in the list
  await waitFor(() => {
    expect(screen.getByText('Test User - Team A - 2023-08-13')).toBeInTheDocument();
  });
});

