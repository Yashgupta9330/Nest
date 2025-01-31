export type RepositoryDetails = {
  key: string
  owner_key: string
}

export type Issue = {
  comments_count: number
  created_at: number
  number: number
  repository: RepositoryDetails
  title: string
}

export type Release = {
  is_pre_release: boolean
  name: string
  published_at: number
  repository: RepositoryDetails
  tag_name: string
}

export type User = {
  avatar_url: string
  bio: string
  company: string
  created_at: number
  email: string
  followers_count: number
  following_count: number
  issues?: Issue[]
  key: string
  location: string
  login: string
  name: string
  objectID: string
  public_repositories_count: number
  releases?: Release[]
  title: string
  twitter_username: string
  updated_at: number
  url: string
}

export interface UserDetailsProps {
  avatar_url: string
  bio: string
  company: string
  created_at: number
  email: string
  followers_count: number
  following_count: number
  issues?: Issue[]
  location: string
  login: string
  name: string
  objectID: string
  public_repositories_count: number
  releases?: Release[]
  title: string
  twitter_username: string
  updated_at: number
  url: string
}
