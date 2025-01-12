import { Typography, Box } from '@mui/material';

export default function Layout({ children }) {
  return (
    <Box sx={{ p: 1, width: '100%', }}>

      {children}
    </Box>
  );
}
