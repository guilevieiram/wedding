'use client'
import { useState, useEffect } from 'react'
import { Box, Typography, CardContent, TextField, Button, Modal, Backdrop, Fade, Link } from '@mui/material'
import GlassCard from '../(components)/glassCard'

export default function Page() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [hotel, setHotel] = useState('')
  const [convidados, setConvidados] = useState(0)
  const [kids, setKids] = useState(0)

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
      hotel,
    }
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log({ result })

      if (response.status === 400) {
        const message = result.message
        setModalMessage(`Nâo foi possível confirmar sua presença... ${message}`)
        setIsError(true)
        setModalOpen(true)
        return
      }

      if (response.status !== 200) {
        setModalMessage(`Nâo foi possível confirmar sua presença...`)
        setIsError(true)
        setModalOpen(true)
        return
      }

      setModalMessage('Sua presença foi confirmada com sucesso!')
      setIsError(false)
      setModalOpen(true)
      // Clear form on success
      setFirstName('')
      setLastName('')
      setHotel('')
      setConvidados('')
      setKids('')
    } catch (error) {
      setModalMessage('Um erro se passou... Por favor contate-nos para mais informações.')
      setIsError(true)
      setModalOpen(true)
    }
  }

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
            Confirme sua presença!
          </Typography>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <TextField
              label="Nome"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <TextField
              label="Sobrenome"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <TextField
              label="Número de acompanhantes"
              variant="outlined"
              type="number"
              value={convidados}
              onChange={(e) => setConvidados(e.target.value)}
            />
            <TextField
              label="Número de crianças"
              variant="outlined"
              type="number"
              value={kids}
              onChange={(e) => setKids(e.target.value)}
            />
            <TextField
              label="Hotel"
              variant="outlined"
              value={hotel}
              onChange={(e) => setHotel(e.target.value)}
            />
            <Button variant="contained" type="submit">
              Confirmar
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
            <Typography variant="h6" gutterBottom>{isError ? 'Oops...' : 'Yay!'}</Typography>
            <Typography variant="body1" gutterBottom>{modalMessage}</Typography>
            {isError && (
              <Typography variant="body2">
                Entre em contato <Link href="/contact">aqui</Link> para tirar qualquer duvida.
              </Typography>
            )}
            <Box mt={2}>
              <Button variant="contained" onClick={() => setModalOpen(false)}>
                Fechar
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  )
}
