import { TextField } from '@mui/material'
import { useEffect, useState } from 'react'

interface Props {
  onSearch: (query: string) => void
}

const SearchBox = ({ onSearch }: Props) => {
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (query.length > 3) onSearch(query)
  }, [onSearch, query])

  return (
    <TextField
      label="Search pokemons"
      name="pokemonSearch"
      size="small"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}

export default SearchBox
