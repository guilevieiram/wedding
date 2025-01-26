'use client'
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Container,
  Stack,
  styled
} from '@mui/material';

// ---------------------------
// 1. Styled Components (MUI)
// ---------------------------
const TimeBox = styled(Paper)(({ theme }) => ({
  // If you want the box itself to grow according to the new width
  // you could override width here too, e.g. width: '100%' 
  width: '50px',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.primary.main,
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '1.2rem'
}));

const Label = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  fontSize: '0.7rem',
  fontWeight: 400,
  letterSpacing: '0.05em'
}));

// ---------------------------
// 2. Helper Function
// ---------------------------
function calculateTimeLeft() {
  const targetDate = new Date('2025-08-02T15:30:00-03:00');
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days, hours, minutes, seconds };
}

// ---------------------------
// 3. Countdown Component
// ---------------------------
export const CountdownClock = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <Container sx={{ textAlign: 'center', pt: 2 }}>
      <Grid 
        container 
        spacing={2} 
        justifyContent="center" 
        alignItems="center"
        wrap="nowrap" // prevents items from wrapping
      >
        <Grid item sx={{ maxWidth: '20vw' }}>
          <Stack alignItems="center">
            <TimeBox elevation={3}>{days}</TimeBox>
            <Label>Dias</Label>
          </Stack>
        </Grid>
        <Grid item sx={{ maxWidth: '20vw' }}>
          <Stack alignItems="center">
            <TimeBox elevation={3}>{hours}</TimeBox>
            <Label>Horas</Label>
          </Stack>
        </Grid>
        <Grid item sx={{ maxWidth: '20vw' }}>
          <Stack alignItems="center">
            <TimeBox elevation={3}>{minutes}</TimeBox>
            <Label>Minutos</Label>
          </Stack>
        </Grid>
        <Grid item sx={{ maxWidth: '20vw' }}>
          <Stack alignItems="center">
            <TimeBox elevation={3}>{seconds}</TimeBox>
            <Label>Segundos</Label>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};
