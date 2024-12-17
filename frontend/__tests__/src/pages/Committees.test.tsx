import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'

import '@testing-library/jest-dom'
import { Committees } from '../../../src/pages'
import { mockCommitteeData } from '../data/mockCommitteeData'

const mockWindowOpen = jest.fn()
Object.defineProperty(window, 'open', {
  value: mockWindowOpen,
  writable: true,
})

describe('Committees Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    global.fetch = jest.fn().mockResolvedValue({
      json: async () => mockCommitteeData,
    })

    delete window.location
    window.location = {
      search: '',
      href: 'http://localhost',
    } as Location
  })

  test('sets document title on component mount', async () => {
    render(<Committees />)
    expect(document.title).toBe('OWASP Committees')
  })

  test('handles URL query parameter correctly', async () => {
    delete window.location
    window.location = {
      search: '?q=test-query',
      href: 'http://localhost?q=test-query',
    } as Location

    render(<Committees />)

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `${process.env.VITE_NEST_API_URL}/owasp/search/committee?q=test-query`
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

  test('renders initial loading state', () => {
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
    global.fetch = jest.fn().mockRejectedValue(new Error('Fetch failed'))

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    render(<Committees />)

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled()
    })

    consoleSpy.mockRestore()
  })
})
