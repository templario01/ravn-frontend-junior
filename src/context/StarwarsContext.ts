import { createContext } from 'react'

export interface People {
  name: string
  height: string
  birth_year: string
  created: string
  edited: string
  eye_color: string
  films: string[]
  gender: string
  hair_color: string
  homeworld: string
  mass: string
  skin_color: string
  spaces: string[]
  starships: string[]
  url: string
  vehicles: string[]
}
export type StarwarsContextType = {
  people: People[]
  getPeople: () => Promise<void>
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export const StarwarsContext = createContext<StarwarsContextType | null>(null)
