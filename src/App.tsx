import { Layout } from 'components/layout'
import PokemonList from 'pages/PokemonList'
import { ReactQueryDevtools } from 'react-query/devtools'

function App() {
  return (
    <>
      <Layout header={'PokeField'} body={<PokemonList />} footer={<ReactQueryDevtools />} />
    </>
  )
}

export default App
