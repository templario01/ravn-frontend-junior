import { gql } from '@apollo/client'

export const ALL_PEOPLE = gql`
  query ALL_PEOPLE($last: Int, $first: Int, $before: String, $after: String) {
    allPeople(last: $last, first: $first, before: $before, after: $after) {
      people {
        id
        name
        homeworld {
          name
        }
        species {
          name
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`

export const PERSON_BY_ID = gql`
  query PERSON_BY_ID($personId: ID!) {
    person(id: $personId) {
      eyeColor
      hairColor
      skinColor
      birthYear
      ships: starshipConnection {
        starships {
          id
          name
        }
      }
    }
  }
`
