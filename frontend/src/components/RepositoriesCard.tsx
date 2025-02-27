import {
  faCodeFork,
  faStar,
  faUsers,
  faExclamationCircle,
  faChevronDown,
  faChevronUp,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type React from 'react'
import { useState } from 'react'
import { RepositoriesCardProps, RepositoryCardProps } from 'types/project'

const RepositoriesCard: React.FC<RepositoriesCardProps> = ({ repositories }) => {
  const [showAllRepositories, setShowAllRepositories] = useState(false)

  const displayedRepositories = showAllRepositories ? repositories : repositories.slice(0, 4)

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {displayedRepositories.map((repo, index) => (
          <RepositoryItem key={index} {...repo} />
        ))}
      </div>
      {repositories.length > 4 && (
        <div className="mt-6 flex items-center justify-center text-center">
          <button
            onClick={() => setShowAllRepositories(!showAllRepositories)}
            className="mt-4 flex items-center justify-center text-[#1d7bd7] hover:underline dark:text-sky-600"
          >
            {showAllRepositories ? (
              <>
                Show less <FontAwesomeIcon icon={faChevronUp} className="ml-1" />
              </>
            ) : (
              <>
                Show more <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}

const RepositoryItem: React.FC<RepositoryCardProps> = ({
  name,
  openIssuesCount,
  contributorsCount,
  forksCount,
  starsCount,
  url,
}) => (
  <div className="flex h-48 w-full flex-col justify-between rounded-lg border p-4 shadow-sm ease-in-out hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
    <a
      href={url}
      target="_blank"
      className="font-semibold text-blue-600 hover:underline dark:text-sky-400"
    >
      {name}
    </a>
    <div className="space-y-2 text-sm">
      <InfoItem icon={faUsers} label="Contributors" value={contributorsCount} />
      <InfoItem icon={faExclamationCircle} label="Issues" value={openIssuesCount} />
      <InfoItem icon={faCodeFork} label="Forks" value={forksCount} />
      <InfoItem icon={faStar} label="Stars" value={starsCount} />
    </div>
  </div>
)

const InfoItem: React.FC<{ icon: IconDefinition; label: string; value: number }> = ({
  icon,
  label,
  value,
}) => (
  <div className="flex items-center justify-between">
    <span className="flex items-center">
      <FontAwesomeIcon icon={icon} className="mr-2 h-4 w-4" />
      {label}
    </span>
    <span className="font-medium">{value.toLocaleString()}</span>
  </div>
)

export default RepositoriesCard
