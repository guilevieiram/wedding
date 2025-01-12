'use client'

import {
  Box,
  Typography,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Link,
  LinearProgress
} from '@mui/material';
import GlassCard from '../../(components)/glassCard';
import HorizontalSeparator from '@/app/(components)/serparator';
import { useState, useEffect } from 'react';

export default function Page() {
  const [hotelsData, setHotelsData] = useState([])
  useEffect(() => {
    fetch('/content/hotels.json')
      .then((response) => response.json())
      .then((data) => setHotelsData(data))
      .catch((error) => {
        console.error('Error fetching JSON:', error);
      });
  }, []);


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 'full',
        p: 2,
      }}
    >

      <GlassCard>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              justifyContent: 'center',
              alignItems: 'center',
              p: 2,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Hoteis
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              Listamos abaixo locais de estada em Ouro Preto! Faça sua busca pelo que mais
              se parecer com você e já reserve seu cantinho!
            </Typography>
          </Box>
        </CardContent>
      </GlassCard>

      <HorizontalSeparator />
      {
        !hotelsData ? <LinearProgress /> :
          <Box sx={{ width: '100%' }}>

            <List >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {hotelsData.map((hotel) => (
                  <GlassCard key={hotel.name} sx={{ width: '100%' }} >
                    <CardContent >
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={hotel.name}
                          secondary={
                            <>
                              <Typography variant="body2">{hotel.address}</Typography>
                              <Typography variant="body2">{hotel.phone}</Typography>
                              <Link
                                href={hotel.link}
                                target="_blank"
                                rel="noopener"
                                variant="body2"
                              >
                                {hotel.link}
                              </Link>
                            </>
                          }
                        />
                      </ListItem>
                    </CardContent>
                  </GlassCard>
                ))}
              </Box>
            </List>
          </Box>
      }
    </Box>
  );
}
