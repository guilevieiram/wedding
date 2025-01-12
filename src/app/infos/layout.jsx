import { Typography, Box } from '@mui/material';

export default function Layout({ children }) {
  return (
    <Box sx={{ p: 2 ,display: 'flex', flexDirection:'column', alignItems:'center', width: 'full', maxWidth: 800, margin:'auto'}}>
      {children}
    </Box>
  );
}
