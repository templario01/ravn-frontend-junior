import { Fragment, useContext, useState } from 'react'
import {
  AllPeopleResponse,
  IFetchMore,
  IFetchMoreResult,
  Person,
  StarwarsContext,
  StarwarsContextType,
} from '../context/StarwarsContext'
import { Waypoint } from 'react-waypoint'
import logo from '../assets/load.gif'

export const Sidebar = () => {
  const [isLoadingMore, setLoadingMore] = useState(false)
  const { data, fetchMore, take, loading, setPersonId } = useContext(
    StarwarsContext
  ) as StarwarsContextType

  const handleWaypoint = (
    allPeopleData: AllPeopleResponse,
    fetchMorePeople: IFetchMore,
    step: number
  ): void => {
    const endCursor = allPeopleData?.allPeople?.pageInfo?.endCursor
    if (endCursor && fetchMorePeople) {
      setLoadingMore(true)
      fetchMorePeople({
        variables: { first: step, after: endCursor },
        updateQuery: (
          prev: AllPeopleResponse,
          { fetchMoreResult }: IFetchMoreResult
        ) => {
          setLoadingMore(false)
          if (!fetchMoreResult) {
            return prev
          }
          fetchMoreResult.allPeople.people = [
            ...prev.allPeople.people,
            ...fetchMoreResult.allPeople.people,
          ]
          return fetchMoreResult
        },
      })
    }
  }

  const getInfo = (person: Person): string => {
    return `${person?.species?.name || 'Human'}  from ${
      person?.homeworld?.name || ''
    }`
  }

  return (
    <div className="sidebar-height w-96 bg-white  overflow-auto">
      {data?.allPeople?.people.map((person: Person, index: number) => {
        return (
          <Fragment key={index}>
            <li
              className="border-b- w-full h-24 flex justify-center items-center content-center flex-col border-b cursor-pointer"
              key={person.name}
              onClick={() => {
                setPersonId(person.id)
              }}
            >
              <h2 className="font-bold ">{person.name}</h2>
              <span className="text-slate-600">{getInfo(person)}</span>
            </li>

            {index + 1 === data?.allPeople?.people.length && (
              <Waypoint onEnter={() => handleWaypoint(data, fetchMore, take)} />
            )}
          </Fragment>
        )
      })}
      {(loading || isLoadingMore) && (
        <div className="pb-5 pt-5 w-full flex justify-center gap-1">
          <span className="font-bold">loading more items</span>&nbsp;
          <img className="w-5" src={logo} alt="loading..." />
        </div>
      )}
    </div>
  )
}
