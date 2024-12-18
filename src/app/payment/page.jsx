import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material'
import GlassCard from '../(components)/glassCard'

export default function Page() {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 4,
        justifyContent: 'center',
        alignItems: 'flex-start',
        p: 2,
      }}
    >
      <GlassCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            COmo que eu pago ze da manga
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            with us please?
          </Typography>
          <Typography variant="body2" textAlign={'justify'}>
            This is some sample text inside the glass-effect card. Notice the subtle blur and transparency that give it a frosted look against the background.
          </Typography>
        </CardContent>
      </GlassCard>
    </Box>
  )
}
