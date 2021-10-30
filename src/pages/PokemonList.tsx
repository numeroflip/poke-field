import { Pagination } from '@mui/material'
import SearchBox from 'components/SearchBox'
import { useState } from 'react'
import { useDetailedPokemonDataList, usePokemonNameList } from 'shared/api/hooks'

const ITEMS_PER_PAGE = 16

const PokemonList = () => {
  const [page, setPage] = useState(0)
  const nameListState = usePokemonNameList()
  const { pokemonStates, isLoading } = useDetailedPokemonDataList({
    page,
    itemsPerPage: ITEMS_PER_PAGE,
  })

  const pokemonCount = nameListState?.data?.count
  const pageCount = pokemonCount ? Math.floor(pokemonCount / ITEMS_PER_PAGE) : null
  const handlePageChange = (_: unknown, _page: number) => setPage(_page)

  return (
    <>
      <h1>Pokemon List</h1>
      <SearchBox onSearch={(query) => console.log('query: ', query)} />
      {isLoading
        ? 'Loading...'
        : pokemonStates?.map(({ data, isLoading, error }) => {
            if (error) return 'Error happened'
            if (isLoading) return 'Loading...'
            return <div>{data?.name}</div>
          })}
      {pageCount ? <Pagination onChange={handlePageChange} count={pageCount} /> : null}
    </>
  )
}

export default PokemonList
