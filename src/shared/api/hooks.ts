import { Pokemon } from 'modules/pokemon/model'
import { useEffect, useMemo } from 'react'
import { QueryKey, useQueries, useQuery, UseQueryOptions } from 'react-query'
import { fetchPokemon, fetchPokemons } from '.'

const usePokemonNameList = () => {
  const pokemonShortInfos = useQuery({
    queryKey: 'pokemonShortInfos',
    queryFn: fetchPokemons,
    staleTime: Infinity,
  })
  return {
    ...pokemonShortInfos,
    nameList: pokemonShortInfos?.data?.results?.map?.(({ name }) => name),
  } as const
}

const useDetailedPokemonData = (name: string) => {
  const pokemonData = useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemon(name),
    staleTime: Infinity,
  })
  return pokemonData
}

interface Options {
  page: number
  itemsPerPage: number
}

const useDetailedPokemonDataList = ({ page, itemsPerPage }: Options) => {
  const { nameList: pokemonNameList } = usePokemonNameList()

  const fetchDetailedInfosOptions: UseQueryOptions<Pokemon, unknown, unknown, QueryKey>[] =
    useMemo(() => {
      if (!pokemonNameList?.length) return []
      const start = page * itemsPerPage
      const end = (page + 1) * itemsPerPage
      const namesForCurrentPage = pokemonNameList.slice(start, end)

      const finalQueryOptions = namesForCurrentPage.map((name) => ({
        queryKey: ['pokemon', name],
        queryFn: () => fetchPokemon(name),
        enabled: !!pokemonNameList,
        staleTime: Infinity,
      }))
      return finalQueryOptions
    }, [page, itemsPerPage, pokemonNameList])

  useEffect(() => {
    console.log('fetchDetailedInfosOptions changed')
  }, [fetchDetailedInfosOptions])

  const detailedPokemons = useQueries(fetchDetailedInfosOptions)

  return {
    pokemonStates: detailedPokemons,
    isLoading: detailedPokemons.some((pokemonState) => pokemonState.isLoading),
  } as const
}

export { useDetailedPokemonDataList, usePokemonNameList, useDetailedPokemonData }
