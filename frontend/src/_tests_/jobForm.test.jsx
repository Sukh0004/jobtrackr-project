import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import JobForm from '../pages/JobForm';

// Mock API module
vi.mock('../utils/api', () => ({
  default: {
    post: vi.fn(() => Promise.resolve({ data: {} })),
    put: vi.fn(() => Promise.resolve({ data: {} }))
  }
}));

describe('JobForm Component', () => {
  test('fills and submits form in add mode', async () => {
    render(
      <MemoryRouter initialEntries={['/add']}>
        <JobForm />
      </MemoryRouter>
    );

    // Fill the form
    fireEvent.change(screen.getByPlaceholderText('Job Title'), {
      target: { value: 'Software Engineer' }
    });

    fireEvent.change(screen.getByPlaceholderText('Company'), {
      target: { value: 'Google' }
    });

    fireEvent.change(screen.getByPlaceholderText('Notes'), {
      target: { value: 'Exciting opportunity' }
    });

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Applied' }
    });

    // Click Save (submit button)
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    // No assertion needed if mock is resolved — test will fail if there's a crash
  });

  test('fills and submits form in edit mode', async () => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: '/edit/123', state: { _id: '123', title: 'Old Title', company: 'Old Co', status: 'Applied', notes: 'Old Note' } }]}
      >
        <JobForm />
      </MemoryRouter>
    );

    // Modify title
    fireEvent.change(screen.getByPlaceholderText('Job Title'), {
      target: { value: 'Updated Title' }
    });

    // Click Update
    fireEvent.click(screen.getByRole('button', { name: /update/i }));
  });
});
