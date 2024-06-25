import React, { act } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter, useLocation } from 'react-router-dom';

import CaseTablePage from '../../components/CaseTablePage';
import { mockData } from '../../utils/mockData';

const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock the react-router-dom module
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('CaseTablePage', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clears all mock calls between tests, including axios calls
  });

  afterEach(() => {
    jest.resetAllMocks();
    mockedAxios.get.mockClear();
  });

  it('Should fetch cases data with all statuses', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockData });
    (useLocation as jest.Mock).mockReturnValue({
      pathname: '/',
    });
    render(
      <BrowserRouter>
        <CaseTablePage tabelType="cases" />
      </BrowserRouter>,
    );
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith('/requests', {
        params: { limit: 10, page: 1 },
      });
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(mockData.data.length + 1); // 1 for the header row
    });
  });

  it('Should fetch cases data with a In progress status', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockData });
    (useLocation as jest.Mock).mockReturnValue({
      pathname: '/pending',
    });
    render(
      <BrowserRouter>
        <CaseTablePage tabelType="Pending Cases" />
      </BrowserRouter>,
    );
    await waitFor(() => {
      expect(screen.getByText('Pending Cases')).toBeInTheDocument();
      expect(mockedAxios.get).toHaveBeenCalledWith('/requests', {
        params: { limit: 10, page: 1, status: 'In Progress' },
      });
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(mockData.data.length + 1); // 1 for the header row
    });
  });

  it('Should fetch cases data with a Rejected status', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockData });
    (useLocation as jest.Mock).mockReturnValue({
      pathname: '/rejected',
    });
    render(
      <BrowserRouter>
        <CaseTablePage tabelType="Rejected Cases" />
      </BrowserRouter>,
    );
    await waitFor(() => {
      expect(screen.getByText('Rejected Cases')).toBeInTheDocument();
      expect(mockedAxios.get).toHaveBeenCalledWith('/requests', {
        params: { limit: 10, page: 1, status: 'Rejected' },
      });
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(mockData.data.length + 1); // 1 for the header row
    });
  });

  it('Should sort fields on row click', async () => {
    mockedAxios.get.mockResolvedValue({ data: { ...mockData } });
    (useLocation as jest.Mock).mockReturnValue({
      pathname: '/',
    });
    render(
      <BrowserRouter>
        <CaseTablePage tabelType="All cases" />
      </BrowserRouter>,
    );
    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(mockData.data.length + 1); //  +1 for the header row
    });
    mockedAxios.get.mockResolvedValueOnce({ data: { ...mockData } });
    act(() => {
      fireEvent.click(screen.getByText('CASE NAME'));
    });
    await waitFor(() => {
      expect(screen.getByText('All cases')).toBeInTheDocument();
      expect(mockedAxios.get).toHaveBeenCalledWith('/requests', {
        params: { limit: 10, page: 1, sort: 'caseName', order: 'asc' },
      });
    });
  });

  it('Should search by string', async () => {
    mockedAxios.get.mockResolvedValue({ data: { ...mockData } });
    (useLocation as jest.Mock).mockReturnValue({
      pathname: '/',
    });
    render(
      <BrowserRouter>
        <CaseTablePage tabelType="All cases" />
      </BrowserRouter>,
    );
    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(mockData.data.length + 1); // +1 for the header row
    });
    mockedAxios.get.mockResolvedValueOnce({ data: {} });
    act(() => {
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'test' },
      });
      fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    });

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(1); // 1 for the header row
    });
  });
});
