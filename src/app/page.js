import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material'
import GlassCard from './(components)/glassCard'

export default function Page() {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 4,
        justifyContent: 'center',
        alignItems: 'flex-start',
        p: 4,
        // A background image or gradient helps show the glass effect
        // background: 'url(/your-background.jpg) no-repeat center/cover', 
        minHeight: '100vh',
      }}
    >
      {/* Glass Effect Card */}
      <GlassCard>
        <CardMedia
          component="img"
          height="200"
          image="/flowers.jpg"
          alt="Flowers"
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Glass Card Title
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            A Beautiful Subtitle
          </Typography>
          <Typography variant="body2" textAlign={'justify'}>
            This is some sample text inside the glass-effect card. Notice the subtle blur and transparency that give it a frosted look against the background.
          </Typography>
        </CardContent>
      </GlassCard>
    </Box>
  )
}
