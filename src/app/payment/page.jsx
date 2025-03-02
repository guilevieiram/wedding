'use client'

import { Button, TextField } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';
import {
  Box,
  Typography,
  CardContent,
} from '@mui/material';
import GlassCard from '../(components)/glassCard';
import HorizontalSeparator from '@/app/(components)/serparator';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
function formatPrice(priceInCents) {
  return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
  }).format(priceInCents);
}


export default function Page() {
  const [presents, setPresents] = useState([]);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    fetch('/content/presents.json')
      .then((response) => response.json())
      .then((data) => setPresents(data))
      .catch((error) => {
        console.error('Error fetching JSON:', error);
      });
  }, []);

  const selectedPresent = presents.find(present => present.id === Number(id));
  const price = selectedPresent ? selectedPresent.price : null;

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
      <GlassCard sx={{ width: '100%', maxWidth: '800px' }}>
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
              width: 'max'
            }}
          >
            <Typography variant="h4" gutterBottom>
              Pagamentos
            </Typography>
      {selectedPresent &&
          <Typography variant="body1" gutterBottom>
            Você escolheu contribuir com {selectedPresent.name}
            ({formatPrice(selectedPresent.price)})
          </Typography>
      }
          </Box>
        </CardContent>
      </GlassCard>

      <HorizontalSeparator />
      {/* <GlassCard sx={{ width: '100%', maxWidth: '800px' }}
      >
        <CardContent>
          <PixComponent valor={price} />
        </CardContent>
      </GlassCard> */}

      <GlassCard sx={{ width: '100%', maxWidth: '800px' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Conta BRL
          </Typography>
          <Typography variant="body1" gutterBottom>
            Agência: 2270
          </Typography>
          <Typography variant="body1" gutterBottom>
            Conta: 60.000353.2
          </Typography>
          <Typography variant="body1" gutterBottom>
            Banco: Santander
          </Typography>
          <Typography variant="body1" gutterBottom>
            Titular: Ruben Marcus Fernandes
          </Typography>
          <Typography variant="body1" gutterBottom>
            CPF: 769.976.345-72
          </Typography>
        </CardContent>
      </GlassCard>

      {/* GBP Account */}
      <GlassCard sx={{ width: '100%', maxWidth: '800px' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Conta GBP
          </Typography>
          <Typography variant="body1" gutterBottom>
            Account No: 80648443
          </Typography>
          <Typography variant="body1" gutterBottom>
            Sort Code: 23-14-70
          </Typography>
          <Typography variant="body1" gutterBottom>
            IBAN: GB26TRW123147080648443
          </Typography>
          <Typography variant="body1" gutterBottom>
            Name: Guilherme Vieira Manhaes
          </Typography>
        </CardContent>
      </GlassCard>

      {/* EUR Account */}
      <GlassCard sx={{ width: '100%', maxWidth: '800px' }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Conta EUR
          </Typography>
          <Typography variant="body1" gutterBottom>
            IBAN: BE68967284818234
          </Typography>
          <Typography variant="body1" gutterBottom>
            BIC: TRWIBEB1XXX
          </Typography>
          <Typography variant="body1" gutterBottom>
            Name: Guilherme Vieira Manhaes
          </Typography>
        </CardContent>
      </GlassCard>

      {/* USD Account */}
      <GlassCard sx={{ width: '100%', maxWidth: '800px' }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Conta USD
          </Typography>
          <Typography variant="body1" gutterBottom>
            Account No: 160538606834874
          </Typography>
          <Typography variant="body1" gutterBottom>
            Routing No: 084009519
          </Typography>
          <Typography variant="body1" gutterBottom>
            SWIFT Code: TRWIUS35XXX
          </Typography>
          <Typography variant="body1" gutterBottom>
            Name: Guilherme Vieira Manhaes
          </Typography>
        </CardContent>
      </GlassCard>
    </Box>
  );
}

const PixComponent = ({ valor }) => {
  const pix = {
    chave: "76997634672",
    nome: "Ruben Marcus Fernandes",
    cidade: 'Belo Horizonte'
  };

  const pixCode = gerarPix(pix.chave, formatarValorPix(valor), pix.nome, pix.cidade);
  const qrCodeUrl = `https://gerarqrcodepix.com.br/api/v1?nome=${encodeURIComponent(pix.nome)}&cidade=${encodeURIComponent(pix.cidade)}&chave=${encodeURIComponent(pix.chave)}${valor !== null ? `&valor=${valor}` : ''}`;

  const [copied, setCopied] = useState(false);

  const copyPixCode = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        p: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        PIX
      </Typography>

      <QRCodeCanvas value={pixCode} size={200} />
      <Button variant="outlined" component="a" href={qrCodeUrl} target="_blank">
        Abrir QR Code em outra aba
      </Button>
      <Button variant="contained" onClick={copyPixCode}>
        {copied ? "Copiado!" : "Copiar Código Pix"}
      </Button>
    </Box>
  );
};

function formatarValorPix(valor) {
    // Converte para número e garante duas casas decimais
    let valorFormatado = parseFloat(valor).toFixed(2);
    
    // Substitui vírgula por ponto (caso o usuário tenha inserido com vírgula)
    valorFormatado = valorFormatado.replace(",", ".");

    return valorFormatado;
}
function gerarPix(chave, valor, nome, cidade, txid = "123456") {
  function adicionaCRC16(payload) {
      let polinomio = 0x1021;
      let resultado = 0xFFFF;
  
      for (let i = 0; i < payload.length; i++) {
          resultado ^= payload.charCodeAt(i) << 8;
          for (let j = 0; j < 8; j++) {
              if ((resultado <<= 1) & 0x10000) resultado ^= polinomio;
              resultado &= 0xFFFF;
          }
      }
  
      return payload + "6304" + resultado.toString(16).toUpperCase().padStart(4, '0');
  }

  function montaPayload(chave, valor, nome, cidade, txid) {
      const payload = [
          "000201", // Payload Format Indicator
          "26" + ("0014br.gov.bcb.pix0114" + chave).length.toString().padStart(2, '0') + "0014br.gov.bcb.pix0114" + chave, // Merchant Account Information
          "52040000", // Merchant Category Code (padrão 0000)
          "5303986", // Moeda (986 = BRL)
          valor ? "54" + valor.length.toString().padStart(2, '0') + valor : "", // Valor (opcional)
          "5802BR", // País
          "59" + nome.length.toString().padStart(2, '0') + nome, // Nome do recebedor
          "60" + cidade.length.toString().padStart(2, '0') + cidade, // Cidade do recebedor
          "62" + ("0503" + txid).length.toString().padStart(2, '0') + "0503" + txid, // Informações adicionais (TXID)
      ].join("");

      return adicionaCRC16(payload);
  }

  return montaPayload(chave, valor, nome, cidade, txid);
}
