import { Pokemon } from 'modules/pokemon/model'
import { useMemo } from 'react'
import { QueryKey, useQueries, useQuery, UseQueryOptions } from 'react-query'
import { fetchPokemon, fetchPokemons } from '.'

const usePokemonNameList = () => {
  const pokemonShortInfos = useQuery('pokemonShortInfos', fetchPokemons)
  console.log('pokemonShortInfos.data', pokemonShortInfos.data)
  return {
    ...pokemonShortInfos,
    nameList: pokemonShortInfos?.data?.results?.map?.(({ name }) => name),
  }
}

const useDetailedPokemonData = (name: string) => {
  const pokemonData = useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemon(name),
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
      const namesForCurrentPage = pokemonNameList.slice(page, itemsPerPage)
      const finalQueryOptions = namesForCurrentPage.map((name) => ({
        queryKey: ['pokemon', name],
        queryFn: () => fetchPokemon(name),
        enabled: !!pokemonNameList,
      }))
      return finalQueryOptions
    }, [page, itemsPerPage, pokemonNameList])

  const detailedPokemons = useQueries(fetchDetailedInfosOptions)

  return detailedPokemons
}

export { useDetailedPokemonDataList, usePokemonNameList, useDetailedPokemonData }
