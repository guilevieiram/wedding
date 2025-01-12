import React from 'react';
import { Box } from '@mui/material';

export default function HorizontalSeparator() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}
    >
      {/* Left Line */}
      <Box
        sx={{
          flexGrow: 1,
          height: '1px',
          width:'10%',
          bgcolor: 'divider', // or any custom color like '#ccc'
        }}
      />
      
      {/* Center Image */}
      <Box sx={{ px: 2 }}>
        <Box
          component="img"
          src="/23.png" // Replace with your PNG path
          alt="Separator"
          sx={{
            width: 180,
            height: 'auto', // Adjust as needed
          }}
        />
      </Box>

      {/* Right Line */}
      <Box
        sx={{
          flexGrow: 1,
          height: '1px',
          width:'10%',
          bgcolor: 'divider',
        }}
      />
    </Box>
  );
}
