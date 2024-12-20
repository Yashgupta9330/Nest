import Card from '../components/Card'
<<<<<<< HEAD
import SearchBar from '../components/Search'
import { useSearchQuery } from '../hooks/useSearchquery'
=======
import LoadingSpinner from '../components/LoadingSpinner'
import Pagination from '../components/Pagination'
import SearchBar from '../components/Search'
import { loadData } from '../lib/api'
>>>>>>> 2add9c805c182a6499007faca01e0d3fa29a52c2
import FontAwesomeIconWrapper from '../lib/FontAwesomeIconWrapper'
import { ChapterDataType, ChapterType } from '../lib/types'
import { handleSocialUrls } from '../lib/utils'
<<<<<<< HEAD
import { API_URL } from '../utils/credentials'

export default function Chapters() {
  const {
    data: chapterData,
    setData: setChapterData,
    defaultData: defaultChapters,
    initialQuery,
  } = useSearchQuery<ChapterDataType>({
    apiUrl: `${API_URL}/owasp/search/chapter`,
    entityKey: 'chapters',
    initialTitle: 'OWASP Chapters',
  })
=======
import logger from '../utils/logger'

const ChaptersPage = () => {
  const [chapterData, setChapterData] = useState<ChapterType[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    document.title = 'OWASP Chapters'
    setIsLoaded(false)
    const fetchData = async () => {
      try {
        const data = await loadData<ChapterDataType>(
          'owasp/search/chapter',
          searchQuery,
          currentPage
        )
        setChapterData(data.chapters)
        setTotalPages(data.total_pages)
      } catch (error) {
        logger.error(error)
      }
      setIsLoaded(true)
    }
    fetchData()
  }, [currentPage, searchQuery])
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }
>>>>>>> 2add9c805c182a6499007faca01e0d3fa29a52c2

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    })
  }
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-normal p-5 text-text">
<<<<<<< HEAD
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
=======
      <SearchBar onSearch={handleSearch} placeholder="Search for OWASP chapters..." />
      {!isLoaded ? (
        <div className="bg-background/50 fixed inset-0 flex items-center justify-center">
          <LoadingSpinner imageUrl="../public/img/owasp_icon_white_sm.png" />
        </div>
      ) : (
        <div className="flex h-fit w-full flex-col items-center justify-normal gap-4">
          {totalPages === 0 && (
            <div className="text bg:text-white m-4 text-xl"> No chapters found </div>
          )}
          {chapterData &&
            chapterData?.map((chapter, index) => {
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
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isLoaded={isLoaded}
      />
>>>>>>> 2add9c805c182a6499007faca01e0d3fa29a52c2
    </div>
  )
}

export default ChaptersPage
