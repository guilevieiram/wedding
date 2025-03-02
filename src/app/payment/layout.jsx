'use client'
import { Typography, Box } from '@mui/material';
import { Suspense } from "react";


export default function Layout({ children }) {
  return (
    <Suspense>

    <Box sx={{ p: 2 ,display: 'flex', flexDirection:'column', alignItems:'center', width: 'full', maxWidth: 800, margin:'auto'}}>
      {children}
    </Box>
    </Suspense>
  );
}

