import {
  ApolloError,
  ApolloQueryResult,
  FetchMoreQueryOptions,
} from '@apollo/client'
import { createContext } from 'react'

export interface Person {
  id: string
  name: string
  homeworld: {
    name: string
  }
  species: {
    name: string
  }
}

export type PageInfo = {
  endCursor: string
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: string
}

export type Variables = {
  after: string
  first: number
}

export type Response = {
  pageInfo: PageInfo
  people: Person[]
}

export type AllPeopleResponse = {
  allPeople: Response
}

export type IFetchMore = <
  TFetchData = any,
  TFetchVars = {
    first: number
  }
>(
  fetchMoreOptions: FetchMoreQueryOptions<TFetchVars, TFetchData> & {
    updateQuery?:
      | ((
          previousQueryResult: any,
          options: {
            fetchMoreResult: TFetchData
            variables: TFetchVars
          }
        ) => any)
      | undefined
  }
) => Promise<ApolloQueryResult<TFetchData>>

export type IFetchMoreResult = {
  fetchMoreResult: AllPeopleResponse
  variables: Variables
}

export type StarwarsContextType = {
  data: any
  error: ApolloError | undefined
  loading: boolean
  take: number
  fetchMore: IFetchMore
  personId: string
  setPersonId: React.Dispatch<React.SetStateAction<string>>
}

// REFACTOR

export const StarwarsContext = createContext<StarwarsContextType | null>(null)
