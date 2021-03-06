import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_PEOPLE } from '../graphql/querys'
import { StarwarsContext } from './StarwarsContext'

type StarwarsProviderProps = {
  children: any
}

export const StarwarsProvider: React.FC<StarwarsProviderProps> = ({
  children,
}) => {
  const [personId, setPersonId] = useState('')
  const take = 5
  const { data, error, loading, fetchMore } = useQuery(ALL_PEOPLE, {
    variables: { first: take },
  })

  return (
    <StarwarsContext.Provider
      value={{
        data,
        error,
        loading,
        fetchMore,
        take,
        personId,
        setPersonId,
      }}
    >
      {children}
    </StarwarsContext.Provider>
  )
}
