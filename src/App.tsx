import { Layout } from 'components/layout'
import PokemonList from 'pages/PokemonList'

function App() {
  return (
    <>
      <Layout body={<PokemonList />} />
    </>
  )
}

export default App
