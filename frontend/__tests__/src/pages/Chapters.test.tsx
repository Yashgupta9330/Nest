import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'

import '@testing-library/jest-dom'
import { Chapters } from '../../../src/pages'
import { mockChapterData } from '../data/mockChapterData'

const mockWindowOpen = jest.fn()
Object.defineProperty(window, 'open', {
  value: mockWindowOpen,
  writable: true,
})

describe('Chapters Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    global.fetch = jest.fn().mockResolvedValue({
      json: async () => mockChapterData,
    })

    delete window.location
    window.location = {
      search: '',
      href: 'http://localhost',
    } as Location
  })

  test('sets document title on component mount', async () => {
    render(<Chapters />)
    expect(document.title).toBe('OWASP Chapters')
  })

  test('handles URL query parameter correctly', async () => {
    delete window.location
    window.location = {
      search: '?q=test-query',
      href: 'http://localhost?q=test-query',
    } as Location

    render(<Chapters />)

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `${process.env.VITE_NEST_API_URL}/owasp/search/chapter?q=test-query`
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

  test('renders initial loading state', () => {
    render(<Chapters />)
    expect(screen.getByPlaceholderText('Search for OWASP chapters...')).toBeInTheDocument()
  })

  test('Join button links to correct URL', async () => {
    render(<Chapters />)

    await waitFor(() => {
      const joinButtons = screen.getAllByText('Join')
      expect(joinButtons.length).toBeGreaterThan(0)

      const firstChapter = mockChapterData.chapters[0]
      expect(joinButtons[0]).toHaveAttribute('href', firstChapter.idx_url)
    })
  })

  test('handles API fetch error gracefully', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Fetch failed'))

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    render(<Chapters />)

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled()
    })

    consoleSpy.mockRestore()
  })
})
