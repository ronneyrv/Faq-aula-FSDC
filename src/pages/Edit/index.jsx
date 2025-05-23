import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  DialogActions,
} from "@mui/material";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleCancel = () => {
    setQuestion("");
    setAnswer("");
    navigate("/");
  };

  useEffect(() => {
    fetch(`http://localhost:3001/faq/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data.question);
        setAnswer(data.answer);
        setLoading(false);
      })
      .catch(() => {
        alert("Erro ao buscar o FAQ.");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`http://localhost:3001/faq/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, answer }),
    })
      .then((res) => {
        if (res.ok) {
          setSuccess(true);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "50px auto",
        padding: 4,
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Editar FAQ
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
          margin="normal"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          multiline
          rows={4}
          required
        />
        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            FAQ atualizado com sucesso!
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Erro ao salvar.
          </Alert>
        )}
        <DialogActions sx={{ padding: 0, marginTop: 2 }}>
          <Button onClick={handleCancel}>Cancelar</Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Salvar FAQ"}
          </Button>
        </DialogActions>
      </form>
    </Box>
  );
}
