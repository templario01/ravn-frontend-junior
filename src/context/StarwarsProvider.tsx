import React, { useState } from 'react'
import apiCall from '../api'
import { People, StarwarsContext } from './StarwarsContext'

type StarwarsProviderProps = {
  children: any
}
export interface IPlanet {
  planet: string
  code: string
}

const URL = 'https://swapi.dev/api/people'

export const planets = {
  '1': 'Tatooine',
  '2': 'Alderaan',
  '3': 'Yavin IV',
  '4': 'Hoth',
  '5': 'Dagobah',
  '6': 'Bespin',
  '7': 'Endor',
  '8': 'Naboo',
  '9': 'Coruscant',
  '10': 'Kamino',
}

export const StarwarsProvider: React.FC<StarwarsProviderProps> = ({
  children,
}) => {
  const [people, setPeople] = useState<People[]>([])
  const [page, setPage] = useState<number>(1)

  const getPeople = async () => {
    try {
      const result = await apiCall({ url: `${URL}/?page=${page}` })
      const parseResult = (result['results'] as People[]).map((people) => {
        const splitUrl = people.homeworld.split('/')
        const code =
          (splitUrl[splitUrl.length - 2] as '1') ||
          '2' ||
          '3' ||
          '4' ||
          '5' ||
          '6' ||
          '7' ||
          '8' ||
          '9' ||
          '10'
        return { ...people, homeworld: planets[code] }
      })
      setPeople([...people, ...parseResult])
      setPage(page + 1)
    } catch (error) {
      setPeople([])
    }
  }

  return (
    <StarwarsContext.Provider value={{ people, getPeople, page, setPage }}>
      {children}
    </StarwarsContext.Provider>
  )
}
