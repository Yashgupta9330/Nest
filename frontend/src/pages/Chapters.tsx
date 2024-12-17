import { useEffect, useState } from 'react'

import Card from '../components/Card'
import SearchBar from '../components/Search'
import FontAwesomeIconWrapper from '../lib/FontAwesomeIconWrapper'
import { ChapterDataType } from '../lib/types'
import { handleSocialUrls } from '../lib/utils'
import { API_URL } from '../utils/credentials'

export default function Chapters() {
  const [chapterData, setChapterData] = useState<ChapterDataType | null>(null)
  const [defaultChapters, setDefaultChapters] = useState<ChapterDataType | null>(null)
  const [initialQuery, setInitialQuery] = useState<string>('')

  useEffect(() => {
    document.title = 'OWASP Chapters'
    const queryParams = new URLSearchParams(window.location.search)
    const urlQuery = queryParams.get('q')
    if (urlQuery) {
      setInitialQuery(urlQuery)
    }

    const fetchApiData = async () => {
      try {
        let response
        if (urlQuery) {
          response = await fetch(`${API_URL}/owasp/search/chapter?q=${urlQuery}`)
          response = await response.json()
        } else {
          response = await fetch(`${API_URL}/owasp/search/chapter`)
          response = await response.json()
        }

        const data = urlQuery ? response.data : response
        setChapterData(data)
        setDefaultChapters(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchApiData()
  }, [])

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-normal p-5 text-text">
      <div className="flex h-fit w-full flex-col items-center justify-normal gap-4">
        <SearchBar
          placeholder="Search for OWASP chapters..."
          searchEndpoint={`${API_URL}/owasp/search/chapter`}
          onSearchResult={setChapterData}
          defaultResults={defaultChapters}
          initialQuery={initialQuery}
        />
        {chapterData?.chapters?.map((chapter, index) => {
          const formattedUrls = handleSocialUrls(chapter.idx_related_urls)

          const SubmitButton = {
            label: 'Join',
            icon: <FontAwesomeIconWrapper icon="fa-solid fa-right-to-bracket" />,
            url: chapter.idx_url,
          }

          return (
            <Card
              key={chapter.objectID || `chapter-${index}`}
              title={chapter.idx_name}
              url={chapter.idx_url}
              summary={chapter.idx_summary}
              leaders={chapter.idx_leaders}
              topContributors={chapter.idx_top_contributors}
              button={SubmitButton}
              social={formattedUrls}
            />
          )
        })}
      </div>
    </div>
  )
}
