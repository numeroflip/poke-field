import { Dialog, DialogContent, Typography, DialogTitle } from '@mui/material'
import { styled } from '@mui/system'
import capitalize from '@mui/utils/capitalize'
import { useDetailedPokemonData } from 'shared/api/hooks'

interface Props {
  name?: string
  open: boolean
  onClose: () => void
}

function DetailsDialog(props: Props) {
  const { data: pokemonData, isLoading, error } = useDetailedPokemonData(props.name || '')

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error happened</div>

  return (
    <Dialog
      maxWidth="sm"
      fullWidth={true}
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {props.name ? capitalize(props.name) : null}
      </DialogTitle>
      <DialogContent>
        <Section>
          <Typography>Species:</Typography>
          <Typography variant="body2" color="text.secondary">
            {pokemonData?.species?.name}
          </Typography>
        </Section>
        {pokemonData?.types ? (
          <Section>
            <Typography>Types: </Typography>
            <ul>
              {pokemonData.types.map((typeObj) => (
                <Typography variant="body2" color="text.secondary" component="li">
                  {typeObj.type.name}
                </Typography>
              ))}
            </ul>
          </Section>
        ) : null}
        <Section>
          <Typography>Weight:</Typography>
          <Typography variant="body2" color="text.secondary">
            {pokemonData?.weight ? pokemonData?.weight / 10 : '-'} kg
          </Typography>
        </Section>
        {pokemonData?.moves ? (
          <Section>
            <Typography>Moves:</Typography>
            <ul>
              {pokemonData.moves.map((move) => (
                <Typography variant="body2" color="text.secondary" component={'li'}>
                  {move.move.name}
                </Typography>
              ))}
            </ul>
          </Section>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}

const Section = styled('section')`
  margin-top: 1rem;
  &:first-child {
    margin-bottom: 1rem;
  }
  ul {
    margin: 0;
  }
`

export { DetailsDialog }
