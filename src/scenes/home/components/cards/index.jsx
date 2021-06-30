import { Box, Card, CardContent, Typography, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

export const Cards = ({ cards, deleteCard }) => {
  return (
    <>
      {cards.map(({ title, description, id }, index) => (
        <Box key={id}>
          <Card variant="outlined">
            <CardContent>
              <Typography>title: {title}</Typography>
              <Typography>description: {description}</Typography>
              <IconButton onClick={() => deleteCard(id, index)}>
                <Delete />
              </IconButton>
            </CardContent>
          </Card>
        </Box>
      ))}

    </>
  )
}
