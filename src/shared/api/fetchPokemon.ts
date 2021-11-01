import { Pokemon } from 'modules/pokemon/model'
import { POKEMON_API, api } from './utils'

function fetchPokemon(identifier: string | number): Promise<Pokemon> {
  return api(`${POKEMON_API}/pokemon/${identifier}`)
}

export { fetchPokemon }
