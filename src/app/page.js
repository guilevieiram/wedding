import { Box, Typography, Card, CardMedia, CardContent, Button } from '@mui/material'
import GlassCard from './(components)/glassCard'
import { CountdownClock } from './(components)/clock'
import HorizontalSeparator from './(components)/serparator'
import { MyLink } from './(components)/link'
import Carousel from './(components)/carousel'

export default function Page() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'start',
        alignItems: 'flex-center',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: '100%',        // full viewport width
          // maxWidth: 1000,
          height: 'max(50vh, 400px)',          // fixed height
          overflow: 'hidden',   // hides any overflowing parts of the image
        }}
      >
        <Box
          component="img"
          src="/pics/14.jpg"    // path to your image
          alt="Banner"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover', // ensures the image covers the box, cropping if needed
            // objectPosition: 'bottom',
          }}
        />
      </Box>
      <Box sx={{ py: 5}}>

        <HorizontalSeparator />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: "column",
          justifyContent: 'start',
          alignItems: 'flex-center',
          // minHeight: '100vh',
          width: '100%',
          m:'auto',
          maxWidth:800,
          gap: 2,
          p: 1,
        }}
      >
        <GlassCard >
          <CardContent >
            <CountdownClock />
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h5" gutterBottom>
              Como Chegar?
            </Typography>
            <Typography variant="body2" textAlign={'justify'}>
Na chegada em Ouro Preto pela Rua Padre Rolim evitar a rota preferencial do Waze, pela rua Henrique Goerceix que é muito íngrime e estreita. 
            </Typography>
            <Typography variant="body2" textAlign={'justify'}>
Seguir e virar à esquerda no museu de Ciência e Tecnologia, pegar a Rua Conselheiro Quintiliano, 
tomar à esquerda na Rua Quinze de Agosto, 
entrar na Rua Campo Grande,
seguir até a Entrada do Vila Relicário que fica a esquerda.
            </Typography>
          </CardContent>
        </GlassCard>

        {/* Glass Effect Card */}
        <GlassCard>
          {/* <CardMedia
            component="img"
            height="200"
            image="/flowers.jpg"
            alt="Flowers"
            sx={{ objectFit: 'cover' }}
          /> */}
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h5" gutterBottom>
              Oi!
            </Typography>
            {/* <Typography variant="subtitle1" gutterBottom>
              A Beautiful Subtitle
            </Typography> */}
            <Typography variant="body2" textAlign={'justify'}>
            É uma alegria imensa dividir com você cada detalhe dos preparativos para o nosso casamento. Desde o primeiro encontro, lá na Praça da Liberdade, construímos juntos uma jornada cheia de descobertas, aventuras e momentos inesquecíveis.
            </Typography>
            <Typography variant="body2" textAlign={'justify'}>
            Entre tantas idas e vindas, escolhemos Londres como lar e Ouro Preto para testemunhar este sonho tão especial ao lado de quem amamos. Por aqui, queremos ajudar você a se organizar e, sobretudo, convidá-lo(a) a deixar suas marcas neste dia que sonhamos como uma verdadeira obra de arte criada a muitas mãos.
            </Typography>
            <Typography variant="body2" textAlign={'justify'}>
              Promete vir com a gente?
            </Typography>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h5" gutterBottom>
              O evento do ano 😊
            </Typography>
            <Typography variant="body2" textAlign={'justify'}>
              Nosso casamento será realizado dia 2/8/25, às 16 horas, no Vila Relicário. Prepare-se para um lugar lindo, com a energia especialíssima das Montanhas de Ouro Preto!
            </Typography>
            <Typography variant="body2" textAlign={'justify'}>
              Cerimônia e recepção serão realizados no mesmo local.
            </Typography>
          </CardContent>
        </GlassCard>

        <Carousel/>
        <GlassCard>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h5" gutterBottom>
              Para se manter informado...
            </Typography>
            <Typography variant="body2" textAlign={'justify'}>
              Neste site você encontrará as principais informações para curtir esse evento: Como chegar, onde ficar, o que usar, como nos presentear, ...
            </Typography>
            <Typography variant="body2" textAlign={'justify'}>
              Caso haja quaisquer dúvidas, não hesite em contactar os noivos, pais, tios e organizadores. Os detalhes de contato podem ser encontrados na {' '}
              <MyLink href='/contact' >página de contatos</MyLink>.
            </Typography>

            <Typography variant="body2" textAlign={'justify'}>
              Explore o site para saber mais:
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap:2,
                p:1,
                mt:2,
                justifyContent: 'center'
              }}  
            >
              {/* <Button variant={'contained'} href="/infos/map">Como chegar</Button>
              <Button variant={'contained'}href="/infos/restaurants">Restaurantes</Button>
              <Button variant={'contained'}href="/rsvp">RSVP</Button> */}
              <Button variant={'contained'}href="/infos/hotels">Hotéis</Button>
              <Button variant={'contained'}href="/infos/restaurants">Restaurantes</Button>
              <Button variant={'contained'}href="/infos/salon">Salões</Button>
              <Button variant={'contained'}href="/infos/presents">Presentes</Button>
              <Button variant={'contained'}href="/infos/dress">Dresscode</Button>
              <Button variant={'contained'}href="/payment">Pagamentos</Button>
              <Button variant={'contained'}href="/rsvp">RSVP</Button>
              <Button variant={'contained'}href="/contact">Contate-nos</Button>
            </Box>
          </CardContent>
        </GlassCard>


      </Box>
    </Box>
  )
}
