import { Pagination } from '@mui/material'
import { Box, styled } from '@mui/system'
import SearchBox from 'components/SearchBox'
import { DetailsDialog, PokemonCard } from 'modules/pokemon'
import { useState } from 'react'
import { useDetailedPokemonDataList, usePokemonNameList } from 'shared/api/hooks'

const ITEMS_PER_PAGE = 16

type DialogState = { open: true; pokemon: string } | { open: false }

const PokemonList = () => {
  const [dialogState, setDialogState] = useState<DialogState>({ open: false })
  const [page, setPage] = useState(0)
  const nameListState = usePokemonNameList()
  const { pokemonStates, isLoading } = useDetailedPokemonDataList({
    page,
    itemsPerPage: ITEMS_PER_PAGE,
  })

  const handleOpenDialog = (pokemonName: string) =>
    setDialogState({ open: true, pokemon: pokemonName })

  const pokemonCount = nameListState?.data?.count
  const pageCount = pokemonCount ? Math.floor(pokemonCount / ITEMS_PER_PAGE) : null
  const handlePageChange = (_: unknown, _page: number) => setPage(_page)

  return (
    <>
      <DetailsDialog
        open={dialogState.open}
        name={'pokemon' in dialogState ? dialogState.pokemon : undefined}
        onClose={() => setDialogState({ open: false })}
      />
      <h1>Pokemon List</h1>
      {/* <SearchBox onSearch={(query) => console.log('query: ', query)} /> */}
      <ListWrapper>
        {isLoading
          ? 'Loading...'
          : pokemonStates?.map(({ data, isLoading, error }) => {
              if (error) return 'Error happened'
              if (isLoading) return 'Loading...'
              if (data?.name) {
                return (
                  <PokemonCard
                    name={data.name}
                    onLearnMoreClick={() => handleOpenDialog(data.name)}
                  />
                )
              }
            })}
      </ListWrapper>
      {pageCount ? (
        <Box my={3}>
          <Pagination onChange={handlePageChange} count={pageCount} />
        </Box>
      ) : null}
    </>
  )
}

const ListWrapper = styled('div')`
  display: grid;
  justify-items: center;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`

export default PokemonList
