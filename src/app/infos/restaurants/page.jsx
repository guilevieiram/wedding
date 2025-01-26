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
  const [restaurantData, setRestaurantData] = useState([])
  useEffect(() => {
    fetch('/content/resto.json')
      .then((response) => response.json())
      .then((data) => setRestaurantData(data))
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
        alignItems: 'center',
        width: 'full',
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
              textAlign: 'justify',
              p: 2,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Restaurantes
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              Seguem aqui algumas sugestões de bons restaurantes nas proximidades para saciar a fome durante sua estadia conosco.
            </Typography>
          </Box>
        </CardContent>
      </GlassCard>

      <HorizontalSeparator />
      {
        restaurantData.length===0 ? <LinearProgress /> :
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
                {restaurantData.map((hotel) => (
                  <GlassCard key={hotel.name} sx={{ width: '100%' }} >
                    <CardContent >
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={hotel.name}
                          secondary={
                            <>
                              {/* <Typography variant="body2">{hotel.address}</Typography> */}
                              <Typography variant="body2">{hotel.phone}</Typography>
                              {/* <Link
                                href={hotel.link}
                                target="_blank"
                                rel="noopener"
                                variant="body2"
                              >
                                {hotel.link}
                              </Link> */}
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
