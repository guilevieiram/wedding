'use client'

import {
  Box,
  Typography,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Button,
  LinearProgress
} from '@mui/material';
import GlassCard from '../../(components)/glassCard';
import HorizontalSeparator from '@/app/(components)/serparator';
import { useState, useEffect } from 'react';

function formatPrice(priceInCents) {
  return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
  }).format(priceInCents);
}

export default function Page() {
  const [hotelsData, setHotelsData] = useState([])
  useEffect(() => {
    fetch('/content/presents.json')
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
              Presentes
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              Será extremamente especial lembrar de cada um com essas sugestões de presentes que poderemos 
              "levar" para nossa vida nova! 
              E desde já a gente agradece!
              🎁
            </Typography>
          </Box>
        </CardContent>
      </GlassCard>

      <HorizontalSeparator />
      {
        hotelsData.length===0 ? <LinearProgress /> :
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
                  <GlassCard key={hotel.id} sx={{ width: '100%' }} >
                    <CardContent >
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={hotel.name}
                          secondary={
                            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                              <Typography variant="body2">{formatPrice(hotel.price)}</Typography>
                              {/* Insert button to take you to payment */}
                              <Button variant={'contained'} href={`/payment?id=${hotel.id}`}>Contribuir</Button>
                            </Box>
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
