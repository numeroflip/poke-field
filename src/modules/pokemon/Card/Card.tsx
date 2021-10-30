import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useDetailedPokemonData } from 'shared/api/hooks'
import capitalize from '@mui/utils/capitalize'

interface Props {
  name: string
}

function PokemonCard(props: Props) {
  const { data: pokemonData, isLoading, error } = useDetailedPokemonData(props.name)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error happened</div>

  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardMedia
        component="img"
        alt={props.name}
        height="150"
        image={pokemonData?.sprites.other?.['official-artwork'].front_default}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {capitalize(props.name)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {pokemonData?.species.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

export { PokemonCard }
