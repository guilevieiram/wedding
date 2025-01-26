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
  const [restaurantData, setRestaurantData] = useState([]);

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
        restaurantData.length === 0 ? (
          <LinearProgress />
        ) : (
          <Box sx={{ width: '100%' }}>
            <List>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {restaurantData.map((resto) => (
                  <GlassCard key={resto.name} sx={{ width: '100%' }}>
                    <CardContent>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={resto.name}
                          secondary={
                            <>
                              {/* Address (opens Google Maps if clicked) */}
                              {resto.address && (
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                  <Link
                                    href={`https://maps.google.com/?q=${encodeURIComponent(resto.address)}`}
                                    target="_blank"
                                    rel="noopener"
                                  >
                                    {resto.address}
                                  </Link>
                                </Typography>
                              )}

                              {/* Phone (opens phone dialer if clicked) */}
                              {resto.phone && (
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                  <Link href={`tel:${resto.phone}`}>
                                    {resto.phone}
                                  </Link>
                                </Typography>
                              )}

                              {/* Website (opens in new tab) */}
                              {resto.website && (
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                  <Link
                                    href={resto.website}
                                    target="_blank"
                                    rel="noopener"
                                  >
                                    {resto.website}
                                  </Link>
                                </Typography>
                              )}

                              {/* Instagram (opens Instagram profile) */}
                              {resto.instagram && (
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                  <Link
                                    href={
                                      resto.instagram.startsWith('http')
                                        ? resto.instagram
                                        : `https://instagram.com/${resto.instagram.replace('@', '')}`
                                    }
                                    target="_blank"
                                    rel="noopener"
                                  >
                                    {resto.instagram}
                                  </Link>
                                </Typography>
                              )}
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
        )
      }
    </Box>
  );
}
