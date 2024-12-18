'use client'
import { useState, useEffect } from 'react'
import { Box, Typography, CardContent, TextField, Button, Modal, Backdrop, Fade, Link } from '@mui/material'
import GlassCard from '../(components)/glassCard'

export default function Page() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [convidados, setConvidados] = useState('')
  const [kids, setKids] = useState('')

  const [modalOpen, setModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      firstName,
      lastName,
      convidados: parseInt(convidados, 10) || 0,
      kids: parseInt(kids, 10) || 0,
      timestamp: new Date().toISOString(),
    }

    // Generate a random key for the JSON file
    const randomKey = `rsvp/${Date.now()}-${Math.floor(Math.random()*100000)}.json`

    try {
      const response = await fetch('/api/s3/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'folder/test.json', data: { message: 'Hello, S3!' } })
      });
    
      const result = await response.json();
      console.log({result})

      await writeJsonToS3(randomKey, data)
      setModalMessage('Your RSVP has been submitted successfully!')
      setIsError(false)
      setModalOpen(true)
      // Clear form on success
      setFirstName('')
      setLastName('')
      setConvidados('')
      setKids('')
    } catch (error) {
      console.error('Error writing to S3:', error)
      setModalMessage('An error occurred while submitting your RSVP. Please contact us for assistance.')
      setIsError(true)
      setModalOpen(true)
    }
  }
  useEffect(() => {
    fetch('/api/hello')
      .then(response => response.text())
      .then(data => console.log(data));
  }, []);


  return (
    <Box
      sx={{
        display: 'flex',
        gap: 4,
        justifyContent: 'center',
        alignItems: 'flex-start',
        p: 2,
      }}
    >
      <GlassCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Confirme sua presenca!
          </Typography>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <TextField 
              label="First Name" 
              variant="outlined" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)} 
              required 
            />
            <TextField 
              label="Last Name" 
              variant="outlined" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)} 
              required 
            />
            <TextField 
              label="Number of Convidados (Guests)" 
              variant="outlined" 
              type="number"
              value={convidados}
              onChange={(e) => setConvidados(e.target.value)} 
              required 
            />
            <TextField 
              label="Number of Kids" 
              variant="outlined" 
              type="number"
              value={kids}
              onChange={(e) => setKids(e.target.value)} 
              required 
            />
            <Button variant="contained" type="submit">
              Submit RSVP
            </Button>
          </form>
        </CardContent>
      </GlassCard>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={modalOpen}>
          <Box 
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              maxWidth: 300,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" gutterBottom>{isError ? 'Error' : 'Success'}</Typography>
            <Typography variant="body1" gutterBottom>{modalMessage}</Typography>
            {isError && (
              <Typography variant="body2">
                Please <Link href="/contacts">contact us</Link> for help.
              </Typography>
            )}
            <Box mt={2}>
              <Button variant="contained" onClick={() => setModalOpen(false)}>
                Close
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  )
}
