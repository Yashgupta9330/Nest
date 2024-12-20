<<<<<<< HEAD
import { render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import React from 'react'

import '@testing-library/jest-dom'
import Chapters from '../../../src/pages/Chapters'
import logger from '../../../src/utils/logger'
import { mockChapterData } from '../data/mockChapterData'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
=======
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'

import '@testing-library/jest-dom'
import { loadData } from '../../../src/lib/api'
import { ChaptersPage } from '../../../src/pages'
import { mockChapterData } from '../data/mockChapterData'

jest.mock('../../../src/lib/api', () => ({
  loadData: jest.fn(),
}))
>>>>>>> 2add9c805c182a6499007faca01e0d3fa29a52c2

jest.mock('../../../src/utils/credentials', () => ({
  API_URL: 'https://mock-api.com',
}))
jest.mock('../../../src/components/Pagination', () =>
  jest.fn(({ currentPage, onPageChange }) => (
    <div>
      <button onClick={() => onPageChange(currentPage + 1)}>Next Page</button>
    </div>
  ))
)

describe('ChaptersPage Component', () => {
  beforeEach(() => {
<<<<<<< HEAD
    jest.clearAllMocks()

    mockedAxios.get.mockResolvedValue({
      data: mockChapterData,
    })

    delete (window as Partial<Window>).location
    window.location = {
      search: '',
      href: 'http://localhost',
    } as Location
  })

  test('sets document title on component mount', async () => {
    render(<Chapters />)
    await waitFor(() => {
      expect(document.title).toBe('OWASP Chapters')
    })
=======
    ;(loadData as jest.Mock).mockResolvedValue(mockChapterData)
>>>>>>> 2add9c805c182a6499007faca01e0d3fa29a52c2
  })

  test('handles URL query parameter correctly', async () => {
    window.location = {
      search: '?q=test-query',
      href: 'http://localhost?q=test-query',
    } as Location

<<<<<<< HEAD
    render(<Chapters />)
=======
  test('renders loading spinner initially', async () => {
    render(<ChaptersPage />)
    const loadingSpinner = screen.getAllByAltText('Loading indicator')
    await waitFor(() => {
      expect(loadingSpinner.length).toBeGreaterThan(0)
    })
  })
>>>>>>> 2add9c805c182a6499007faca01e0d3fa29a52c2

  test('renders chapter data correctly', async () => {
    render(<ChaptersPage />)
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('/owasp/search/chapter'),
        { params: { q: 'test-query' } }
      )
    })
  })

  test('fetches and sets chapter data correctly', async () => {
    render(<Chapters />)

    await waitFor(() => {
      expect(screen.getByText(mockChapterData.chapters[0].idx_name)).toBeInTheDocument()
      expect(screen.getByText(mockChapterData.chapters[0].idx_summary)).toBeInTheDocument()
    })
  })

  test('renders search bar', () => {
    render(<Chapters />)
    expect(screen.getByPlaceholderText('Search for OWASP chapters...')).toBeInTheDocument()
  })

  test('Join button links to correct URL', async () => {
    render(<Chapters />)

    await waitFor(() => {
      const joinButtons = screen.getAllByText('Join')
      expect(joinButtons.length).toBeGreaterThan(0)

      const firstChapter = mockChapterData.chapters[0]
      const firstJoinButton = joinButtons[0].closest('a')
      expect(firstJoinButton).toHaveAttribute('href', firstChapter.idx_url)
    })
  })

  test('handles API fetch error gracefully', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Fetch failed'))

    const consoleSpy = jest.spyOn(logger, 'error').mockImplementation(() => {})

    render(<Chapters />)

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled()
    })
<<<<<<< HEAD

    consoleSpy.mockRestore()
=======
    expect(screen.getByText('This is a summary of Chapter 1.')).toBeInTheDocument()
    expect(screen.getByText('Isanori Sakanashi,')).toBeInTheDocument()
    expect(screen.getByText('Takeshi Murai,')).toBeInTheDocument()
    expect(screen.getByText('Yukiharu Niwa')).toBeInTheDocument()
    const viewButton = screen.getByText('Join')
    expect(viewButton).toBeInTheDocument()
  })

  test('displays "No chapters found" when there are no chapters', async () => {
    ;(loadData as jest.Mock).mockResolvedValue({ ...mockChapterData, chapters: [], total_pages: 0 })
    render(<ChaptersPage />)
    await waitFor(() => {
      expect(screen.getByText('No chapters found')).toBeInTheDocument()
    })
  })

  test('handles page change correctly', async () => {
    window.scrollTo = jest.fn()
    render(<ChaptersPage />)
    await waitFor(() => {
      const nextPageButton = screen.getByText('Next Page')
      fireEvent.click(nextPageButton)
    })
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'auto',
    })
>>>>>>> 2add9c805c182a6499007faca01e0d3fa29a52c2
  })
})
