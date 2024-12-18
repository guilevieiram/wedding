import { Typography, Box } from '@mui/material';

export default function Layout({ children }) {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" component="h4" textAlign="start" gutterBottom>
        Blog
      </Typography>
      {children}
    </Box>
  );
}
