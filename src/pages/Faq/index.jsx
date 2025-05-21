import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

export default function Faq() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

    try {
      const response = await fetch("http://admin.pedabete.app.br/api/faq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, answer }),
      });

      if (response.ok) {
        setSuccess(true);
        setQuestion("");
        setAnswer("");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        throw new Error("Erro ao adicionar FAQ");
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        margin: "40px auto",
        maxWidth: 600,
        padding: 3,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", textAlign: "center" }}
      >
        Adicionar Nova Pergunta (FAQ)
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Pergunta"
          fullWidth
          margin="normal"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <TextField
          label="Resposta"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />

        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            FAQ adicionado com sucesso!
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Ocorreu um erro ao enviar. Tente novamente.
          </Alert>
        )}

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Adicionar FAQ"}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
