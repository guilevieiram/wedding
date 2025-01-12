'use client'
import { Box, Typography, CardContent } from '@mui/material'

import {
  List,
  ListItem,
  ListItemText,
  Link,
} from '@mui/material';

import HorizontalSeparator from '@/app/(components)/serparator';
import GlassCard from '../(components)/glassCard'

const contactData = [
  {
    name: 'Gabi Horta (Cerimonialista)',
    tel: '+55 31 99105 4009 ',
    email: 'Contato@gabihortaproducoes.com.br'
  },
  {
    name: 'Bruna (Noiva)',
    tel: '+44 07860 667605',
    email: 'brunapafernandes@gmail.com'
  },
  {
    name: 'Gui (Noivo)',
    tel: '+44 07551 623670',
    email: 'guilevieiram@gmail.com'
  },

]

export default function Page() {
  return (
    <Box
      sx={{
              width: '100%',
        gap: 2,
        p: 1,
      }}
    >
      <GlassCard >
        <CardContent>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            <Typography variant="h4" gutterBottom>
              Entre em contato
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              Caso você tenha alguma pergunta, entre em contato com:
            </Typography>

            <List >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                {contactData.map((contact) => (
                  <ListItem key={contact.name} alignItems="flex-start">
                    <ListItemText
                      primary={contact.name}
                      secondary={
                        <>
                          <Typography variant="body2">
                            {/* 'tel:' links open the phone dialer on mobile devices */}
                            <Link
                              href={`tel:${contact.tel}`}
                              style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                              {contact.tel}
                            </Link>
                          </Typography>
                          <Typography variant="body2">
                            {/* 'mailto:' links open the default mail client */}
                            <Link
                              href={`mailto:${contact.email}`}
                              style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                              {contact.email}
                            </Link>
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </Box>
            </List>
          </Box>
        </CardContent>
      </GlassCard>

      <Box sx={{mt:3}}>

      <HorizontalSeparator />
      </Box>
    </Box>
  )
}
