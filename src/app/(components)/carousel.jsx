'use client'
import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, MobileStepper, Button } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function Carousel() {
  const theme = useTheme();

  // Update this array to match your actual image files
  const images = [
    '/pictu/1.jpg',
    '/pictu/2.jpg',
    '/pictu/3.jpg',
    '/pictu/4.jpg',
    '/pictu/5.jpg',
    '/pictu/6.jpg',
    '/pictu/7.jpg',
    '/pictu/8.jpg',
    '/pictu/9.jpg',
    '/pictu/10.jpg',
    // Add more as needed...
  ];

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '800px',
        height: '80vh',
        overflow: 'hidden',
      }}
    >
      <AutoPlaySwipeableViews
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={5000} // auto-advance every second
        // If you'd like to disable autoplay on user interaction:
        // stopAutoPlayOnHover, etc.
      >
        {images.map((src, index) => (
          <Box
            key={src}
            sx={{
              width: '100%',
              height: '80vh',
              minHeight: '800px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                src={src}
                alt={`Carousel image ${index}`}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover', // keeps the entire image visible
                }}
              />
            ) : null}
          </Box>
        ))}
      </AutoPlaySwipeableViews>

      <MobileStepper
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={maxSteps <= 1}>
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={maxSteps <= 1}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </Button>
        }
        // Position MobileStepper absolutely at bottom:
        sx={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.4)', // optional translucent background
        }}
      />
    </Box>
  );
}
