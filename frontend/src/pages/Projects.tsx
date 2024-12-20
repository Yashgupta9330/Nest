<<<<<<< HEAD
=======
import { useState, useEffect } from 'react'

>>>>>>> 2add9c805c182a6499007faca01e0d3fa29a52c2
import Card from '../components/Card'
import { level } from '../components/data'
import LoadingSpinner from '../components/LoadingSpinner'
import Pagination from '../components/Pagination'
import SearchBar from '../components/Search'
<<<<<<< HEAD
import { useSearchQuery } from '../hooks/useSearchquery'
=======
import { loadData } from '../lib/api'
>>>>>>> 2add9c805c182a6499007faca01e0d3fa29a52c2
import FontAwesomeIconWrapper from '../lib/FontAwesomeIconWrapper'
import { project, ProjectDataType } from '../lib/types'
import { getFilteredIcons } from '../lib/utils'
<<<<<<< HEAD
import { API_URL } from '../utils/credentials'

export default function Projects() {
  const {
    data: projectData,
    setData: setProjectData,
    defaultData: defaultProjects,
    initialQuery,
  } = useSearchQuery<ProjectDataType>({
    apiUrl: `${API_URL}/owasp/search/project`,
    entityKey: 'projects',
    initialTitle: 'OWASP Projects',
  })

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-normal p-5 text-text">
      <div className="flex h-fit w-full flex-col items-center justify-normal gap-4">
        <SearchBar
          placeholder="Search for OWASP projects..."
          searchEndpoint={`${API_URL}/owasp/search/project`}
          onSearchResult={setProjectData}
          defaultResults={defaultProjects}
          initialQuery={initialQuery}
        />
        {projectData?.projects?.map((project, index) => {
          const params: string[] = [
            'idx_updated_at',
            'idx_forks_count',
            'idx_stars_count',
            'idx_contributors_count',
          ]
          const filteredIcons = getFilteredIcons(project, params)

          const handleButtonClick = () => {
            window.open(`/projects/contribute?q=${project.idx_name}`, '_blank')
          }

          const SubmitButton = {
            label: 'Contribute',
            icon: <FontAwesomeIconWrapper icon="fa-solid fa-code-fork" />,
            onclick: handleButtonClick,
          }

          return (
            <Card
              key={project.objectID || `project-${index}`}
              title={project.idx_name}
              url={project.idx_url}
              summary={project.idx_summary}
              level={level[`${project.idx_level as keyof typeof level}`]}
              icons={filteredIcons}
              leaders={project.idx_leaders}
              topContributors={project.idx_top_contributors}
              topics={project.idx_topics}
              button={SubmitButton}
              tooltipLabel={`Contribute to ${project.idx_name}`}
            />
          )
        })}
      </div>
=======
import { logger } from '../utils/logger'

const ProjectsPage = () => {
  const [projects, setProjects] = useState<project[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    document.title = 'OWASP Projects'
    setIsLoaded(false)
    const fetchData = async () => {
      try {
        const data = await loadData<ProjectDataType>(
          'owasp/search/project',
          searchQuery,
          currentPage
        )
        setProjects(data.projects)
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    })
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-normal p-5 text-text">
      <SearchBar onSearch={handleSearch} placeholder="Search for OWASP projects..." />
      {!isLoaded ? (
        <div className="bg-background/50 fixed inset-0 flex items-center justify-center">
          <LoadingSpinner imageUrl="../public/img/owasp_icon_white_sm.png" />
        </div>
      ) : (
        <div className="flex h-fit w-full flex-col items-center justify-normal gap-4">
          {totalPages === 0 && (
            <div className="text bg:text-white m-4 text-xl"> No projects found </div>
          )}
          {projects &&
            projects?.map((project, index) => {
              const params: string[] = [
                'idx_updated_at',
                'idx_forks_count',
                'idx_stars_count',
                'idx_contributors_count',
              ]
              const filteredIcons = getFilteredIcons(project, params)
              const handleButtonClick = () => {
                window.open(`/projects/contribute?q=${project.idx_name}`, '_blank')
              }

              const SubmitButton = {
                label: 'Contribute',
                icon: <FontAwesomeIconWrapper icon="fa-solid fa-code-fork" />,
                onclick: handleButtonClick,
              }

              return (
                <Card
                  key={project.objectID || `project-${index}`}
                  title={project.idx_name}
                  url={project.idx_url}
                  summary={project.idx_summary}
                  level={level[`${project.idx_level as keyof typeof level}`]}
                  icons={filteredIcons}
                  leaders={project.idx_leaders}
                  topContributors={project.idx_top_contributors}
                  topics={project.idx_topics}
                  button={SubmitButton}
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

export default ProjectsPage
