import { Card } from '@mui/material'

export default function GlassCard({ children, sx = {} }) {
  return (
    <Card
      sx={{
        backdropFilter: 'blur(10px)',
        background: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 2,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.4)',
        ...sx,
      }}
    >
      {children}
    </Card>
  )
}
