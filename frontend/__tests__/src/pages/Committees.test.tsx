<<<<<<< HEAD
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import React from 'react'

import { Committees } from '../../../src/pages'
import logger from '../../../src/utils/logger'
import { mockCommitteeData } from '../data/mockCommitteeData'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
=======
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'

import '@testing-library/jest-dom'
import { loadData } from '../../../src/lib/api'
import { CommitteesPage } from '../../../src/pages'
import { mockCommitteeData } from '../data/mockCommitteeData'

jest.mock('../../../src/lib/api', () => ({
  loadData: jest.fn(),
}))
>>>>>>> 2add9c805c182a6499007faca01e0d3fa29a52c2

jest.mock('../../../src/utils/credentials', () => ({
  API_URL: 'https://mock-api.com',
}))
jest.mock('../../../src/components/Pagination', () =>
  jest.fn(({ currentPage, onPageChange, totalPages }) => (
    totalPages > 1 ? (
      <div>
        <button onClick={() => onPageChange(currentPage + 1)}>Next Page</button>
      </div>
    ) : null
  ))
)
describe('Committees Component', () => {
  beforeEach(() => {
<<<<<<< HEAD
    jest.clearAllMocks()

    mockedAxios.get.mockResolvedValue({
      data: mockCommitteeData,
    })

    delete (window as Partial<Window>).location
    window.location = {
      search: '',
      href: 'http://localhost',
    } as Location
  })

  test('sets document title on component mount', async () => {
    render(<Committees />)
    await waitFor(() => {
      expect(document.title).toBe('OWASP Committees')
    })
=======
    ;(loadData as jest.Mock).mockResolvedValue(mockCommitteeData)
>>>>>>> 2add9c805c182a6499007faca01e0d3fa29a52c2
  })

  test('handles URL query parameter correctly', async () => {
    window.location = {
      search: '?q=test-query',
      href: 'http://localhost?q=test-query',
    } as Location

<<<<<<< HEAD
    render(<Committees />)
=======
  test('renders loading spinner initially', async () => {
    render(<CommitteesPage />)
    const loadingSpinner = screen.getAllByAltText('Loading indicator')
    await waitFor(() => {
      expect(loadingSpinner.length).toBeGreaterThan(0)
    })
  })

  test('renders committee data correctly', async () => {
    render(<CommitteesPage />)
>>>>>>> 2add9c805c182a6499007faca01e0d3fa29a52c2

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('/owasp/search/committee'),
        { params: { q: 'test-query' } }
      )
    })
  })

  test('fetches and sets committee data correctly', async () => {
    render(<Committees />)

    await waitFor(() => {
      expect(screen.getByText(mockCommitteeData.committees[0].idx_name)).toBeInTheDocument()
      expect(screen.getByText(mockCommitteeData.committees[0].idx_summary)).toBeInTheDocument()
    })
  })

  test('renders search bar', () => {
    render(<Committees />)
    expect(screen.getByPlaceholderText('Search for OWASP committees...')).toBeInTheDocument()
  })

  test('Learn More button links to correct URL', async () => {
    render(<Committees />)

    await waitFor(() => {
      const learnMoreButtons = screen.getAllByText('Learn More')
      expect(learnMoreButtons.length).toBeGreaterThan(0)
      const firstCommittee = mockCommitteeData.committees[0]
      expect(learnMoreButtons[0]).toHaveAttribute('href', firstCommittee.idx_url)
    })
  })

  test('handles API fetch error gracefully', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Fetch failed'))

    const consoleSpy = jest.spyOn(logger, 'error').mockImplementation(() => {})

    render(<Committees />)

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled()
    })
<<<<<<< HEAD

    consoleSpy.mockRestore()
=======
    expect(screen.getByText('This is a summary of Committee 1.')).toBeInTheDocument()
    expect(screen.getByText('Edmond Momartin,')).toBeInTheDocument()
    expect(screen.getByText('Garth Boyd,')).toBeInTheDocument()
    expect(screen.getByText('Kyle Smith')).toBeInTheDocument()
    const viewButton = screen.getByText('Learn More')
    expect(viewButton).toBeInTheDocument()
>>>>>>> 2add9c805c182a6499007faca01e0d3fa29a52c2
  })

  test('displays "No committees found" when there are no committees', async () => {
    ;(loadData as jest.Mock).mockResolvedValue({
      ...mockCommitteeData,
      committees: [],
      total_pages: 0,
    })
    render(<CommitteesPage />)
    await waitFor(() => {
      expect(screen.getByText('No committees found')).toBeInTheDocument()
    })
  })

  test('handles page change correctly when there are multiple pages', async () => {
    window.scrollTo = jest.fn()
    ;(loadData as jest.Mock).mockResolvedValue({
      ...mockCommitteeData,
      total_pages: 2,
    })
    render(<CommitteesPage />)
    await waitFor(() => {
      const nextPageButton = screen.getByText('Next Page')
      fireEvent.click(nextPageButton)
    })
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'auto',
    })
  })

  test('does not render pagination when there is only one page', async () => {
    (loadData as jest.Mock).mockResolvedValue({
      ...mockCommitteeData,
      total_pages: 1,
    })
    render(<CommitteesPage />)
    await waitFor(() => {
      expect(screen.queryByText('Next Page')).not.toBeInTheDocument()
    })
  })
})
