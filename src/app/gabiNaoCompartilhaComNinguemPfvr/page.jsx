"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import GlassCard from "../(components)/glassCard";

export default function RecordsPage() {
  /** --------------------------------------------------------------------
   * State
   * ------------------------------------------------------------------ */
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  /** --------------------------------------------------------------------
   * Fetch data once on mount
   * ------------------------------------------------------------------ */
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await fetch("/api/records?subdir=rsvp");
        if (!res.ok) throw new Error("Falha ao buscar registros");
        const data = await res.json();
        setRecords(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  /** --------------------------------------------------------------------
   * Generate table headers from first row once we have data
   * ------------------------------------------------------------------ */
  const headers = useMemo(() => (records.length ? Object.keys(records[0]) : []), [records]);

  /** --------------------------------------------------------------------
   * Copy data as TSV so users can paste directly into Excel / Sheets
   * ------------------------------------------------------------------ */
  const handleCopyTSV = async () => {
    if (!records.length) return;

    // Build TSV string: header line + each record line
    const tsvRows = [
      headers.join("\t"),
      ...records.map((row) =>
        headers
          .map((h) => String(row[h] ?? "").replace(/\t/g, " "))
          .join("\t")
      ),
    ];
    const tsvString = tsvRows.join("\n");

    try {
      await navigator.clipboard.writeText(tsvString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn("Clipboard API indisponível, fazendo download de fallback", err);
      // Fallback: force file download
      const blob = new Blob([tsvString], { type: "text/tab-separated-values" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "records.tsv";
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  /** --------------------------------------------------------------------
   * Conditional rendering helpers
   * ------------------------------------------------------------------ */
  const renderContent = () => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" p={4}>
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Typography color="error" sx={{ p: 2 }}>
          {error}
        </Typography>
      );
    }

    if (!records.length) {
      return <Typography sx={{ p: 2 }}>Nenhum registro encontrado.</Typography>;
    }

    return (
      <>
        {/* -------------------------------------------------------------- */}
        {/* Copy‑TSV Button                                             */}
        {/* -------------------------------------------------------------- */}
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="contained" onClick={handleCopyTSV} disabled={!records.length}>
            {copied ? "Copiado!" : "Copiar como TSV"}
          </Button>
        </Box>

        {/* -------------------------------------------------------------- */}
        {/* Data Table                                                   */}
        {/* -------------------------------------------------------------- */}
        <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((row, idx) => (
                <TableRow key={idx} hover>
                  {headers.map((header) => (
                    <TableCell key={header}>{row[header]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

  /** --------------------------------------------------------------------
   * Main layout
   * ------------------------------------------------------------------ */
  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
      <GlassCard>
        <Box p={3} minWidth={320} maxWidth="90vw">
          <Typography variant="h5" gutterBottom>
            Lista de Presenças Confirmadas
          </Typography>
          {renderContent()}
        </Box>
      </GlassCard>
    </Box>
  );
}
