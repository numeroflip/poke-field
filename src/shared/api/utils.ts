const POKEMON_API = 'https://pokeapi.co/api/v2'

function api<T>(url: string): Promise<T> {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json()
  })
}

export { POKEMON_API, api }
