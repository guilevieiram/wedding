import React from 'react';
import { Link as MuiLink } from '@mui/material';



export const MyLink = ({ href, children }) => {
  return (
    <MuiLink
      href={href}
      sx={{
        color: 'primary.main',
        textDecoration: 'none',
        fontWeight: 'bold',
        '&:hover': {
          textDecoration: 'underline',
        },
      }}
    >
      {children}
    </MuiLink>
  );
};
