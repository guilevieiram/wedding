import { Typography, Box } from '@mui/material';

export default function Layout({ children }) {
  return (
    <Box sx={{ p: 2 }}>
      {children}
    </Box>
  );
}
