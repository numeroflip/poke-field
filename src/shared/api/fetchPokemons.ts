import { PokemonShort } from 'modules/pokemon/model'
import { api, POKEMON_API } from './utils'

interface PokemonsShortInfo {
  count: number
  next: string | null
  previous: string | null
  results: PokemonShort[]
}

function fetchPokemons(): Promise<PokemonsShortInfo> {
  return api(`${POKEMON_API}/pokemon?limit=9999?skip=0`)
}

export { fetchPokemons }
