import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import React from 'react'

import { Projects } from '../../../src/pages'
import mockProjectData from '../data/mockProjectData'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const mockWindowOpen = jest.fn()
Object.defineProperty(window, 'open', {
  value: mockWindowOpen,
  writable: true,
})

describe('Projects Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    global.fetch = jest.fn().mockResolvedValue({
      json: async () => mockProjectData,
    })

    mockedAxios.get.mockResolvedValue({
      data: mockProjectData,
    })

    delete window.location
    window.location = {
      search: '',
      href: 'http://localhost',
    } as Location
  })

  test('sets document title on component mount', async () => {
    render(<Projects />)
    expect(document.title).toBe('OWASP Projects')
  })

  test('handles URL query parameter correctly', async () => {
    delete window.location
    window.location = {
      search: '?q=test-query',
      href: 'http://localhost?q=test-query',
    } as Location

    render(<Projects />)

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${process.env.VITE_NEST_API_URL}/owasp/search/project`,
        {
          params: { q: 'test-query' },
        }
      )
    })
  })

  test('fetches and sets project data correctly', async () => {
    render(<Projects />)

    await waitFor(() => {
      expect(screen.getByText(mockProjectData.projects[0].idx_name)).toBeInTheDocument()
      expect(screen.getByText(mockProjectData.projects[0].idx_summary)).toBeInTheDocument()
    })
  })

  test('contribute button opens correct URL in new tab', async () => {
    render(<Projects />)

    await waitFor(() => {
      const contributeButtons = screen.getAllByText('Contribute')
      expect(contributeButtons.length).toBeGreaterThan(0)

      contributeButtons[0].click()

      expect(mockWindowOpen).toHaveBeenCalledWith(
        `/projects/contribute?q=${mockProjectData.projects[0].idx_name}`,
        '_blank'
      )
    })
  })

  test('handles API fetch error gracefully', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Fetch failed'))
    mockedAxios.get.mockRejectedValue(new Error('Axios get failed'))

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    render(<Projects />)

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled()
    })

    consoleSpy.mockRestore()
  })
})
