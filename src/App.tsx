import PokemonList from 'pages/PokemonList'
import { useQuery } from 'react-query'
import { fetchPokemons } from 'shared/api'

function App() {
  const { data, error, isLoading } = useQuery('allPokemons', fetchPokemons)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error happened...</p>
  return (
    <>
      <header>Header</header>
      <main>
        <PokemonList />
      </main>
      <footer>Footer</footer>
    </>
  )
}

export default App
