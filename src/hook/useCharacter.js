import { gql, useQuery } from "@apollo/client"

const GET_CHARACTER = gql`
query GetCharacter($id: ID!) {
  character(id: $id){
    name
    status
    species
    gender
    origin{
      name
      type
      dimension
    }
    location{
      name
    }
    image
    created
  }
}`

export const useCharacter = (id) => {
  const { error, loading, data } = useQuery(GET_CHARACTER, {
    variables: {
      id
    }
  })

  return {
    data,
    loading,
    error
  }
}