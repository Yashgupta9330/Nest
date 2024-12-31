<<<<<<< HEAD
import axios from 'axios'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { useDebounce } from '../lib/hooks'
import { ChapterDataType, CommitteeDataType, ProjectDataType } from '../lib/types'
import logger from '../utils/logger'

type SearchResultType = ProjectDataType | CommitteeDataType | ChapterDataType | null

interface SearchBarProps<T extends SearchResultType> {
  placeholder: string
  searchEndpoint: string
  onSearchResult: Dispatch<SetStateAction<T>>
  defaultResults: T
  initialQuery?: string
}

const SearchBar = <T extends SearchResultType>({
  placeholder,
  searchEndpoint,
  onSearchResult,
  defaultResults,
  initialQuery = '',
}: SearchBarProps<T>) => {
  const [query, setQuery] = useState<string>(initialQuery)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (initialQuery.trim()) {
      setQuery(initialQuery)
    }
  }, [initialQuery])

  const debouncedQuery = useDebounce(query, 500)

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      onSearchResult(defaultResults)
      return
    }

    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(searchEndpoint, {
        params: { q: searchQuery },
      })

      const results = response.data.data || response.data
      onSearchResult(results)
    } catch (err) {
      setError('Failed to fetch search results. Please try again.')
      logger.error(err)
      onSearchResult(defaultResults)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (debouncedQuery.trim()) {
      performSearch(debouncedQuery)
    } else {
      onSearchResult(defaultResults)
    }
  }, [debouncedQuery])
=======
import { debounce } from 'lodash'
import { Search, X } from 'lucide-react'
import React, { useEffect, useRef, useState, useMemo } from 'react'

interface SearchProps {
  onSearch: (query: string) => void
  placeholder: string
  initialValue?: string
}

const SearchComponent: React.FC<SearchProps> = ({ onSearch, placeholder, initialValue = '' }) => {
  const [searchQuery, setSearchQuery] = useState(initialValue)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setSearchQuery(initialValue)
  }, [initialValue])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const debouncedSearch = useMemo(
    () => debounce((query: string) => onSearch(query), 750),
    [onSearch]
  )

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setSearchQuery(newQuery)
    debouncedSearch(newQuery)
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    onSearch('')
    inputRef.current?.focus()
  }
>>>>>>> 2add9c805c182a6499007faca01e0d3fa29a52c2

  return (
    <div className="w-full max-w-md p-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder={placeholder}
<<<<<<< HEAD
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-12 text-gray-700 transition-all duration-300 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
=======
          className="h-12 w-full rounded-lg border border-gray-300 pl-10 pr-10 text-lg text-black transition duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
>>>>>>> 2add9c805c182a6499007faca01e0d3fa29a52c2
        />
        {searchQuery && (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={handleClearSearch}
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchComponent
