import SearchBox from 'components/SearchBox'
import { useState } from 'react'
import { useDetailedPokemonDataList } from 'shared/api/hooks'

const PokemonList = () => {
  const [page, setPage] = useState(0)
  const pokemonQueryStates = useDetailedPokemonDataList({ page, itemsPerPage: 16 })

  return (
    <>
      <h1>Pokemon List</h1>
      <SearchBox onSearch={(query) => console.log('query: ', query)} />
      {pokemonQueryStates.map(({ data, isLoading, error }) => {
        if (error) return 'Error happened'
        if (isLoading) return 'Loading...'
        return <div>{data?.name}</div>
      })}
    </>
  )
}

export default PokemonList
