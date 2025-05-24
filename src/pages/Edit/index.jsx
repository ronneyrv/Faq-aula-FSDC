import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  const [del, setDel] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedDelId, setSelectedDelId] = React.useState(null);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleCancel = () => {
    setQuestion("");
    setAnswer("");
    navigate("/");
  };

  const handleDel = (id) => {
    setOpenDialog(true);
    setSelectedDelId(id);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setUsername("");
    setPassword("");
  };

  const handleDelete = () => {
    if (username === "admin" && password === "123") {
      fetch(`http://localhost:3001/faq/${selectedDelId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, answer }),
      })
        .then((res) => {
          if (res.ok) {
            setDel(true);
            setTimeout(() => {
              navigate("/");
            }, 2000);
          } else {
            setError(true);
          }
        })
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    } else {
      alert("Login ou senha incorretos.");
    }
    handleCloseDialog();
  };

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Editar FAQ
        </Typography>

        <DeleteForeverIcon
          sx={{
            cursor: "pointer",
            color: "primary.main",
          }}
          onClick={() => handleDel(id)}
        />
      </Box>

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
            Ocorreu um erro!.
          </Alert>
        )}
        {del && (
          <Alert severity="success" sx={{ mt: 2 }}>
            FAQ deletado com sucesso!
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

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <Box sx={{ padding: 2 }}>
          <DialogTitle>Confirmação para Deletar</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Usuário"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Senha"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </DialogContent>
          <Box sx={{ padding: 2 }}>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancelar</Button>
              <Button onClick={handleDelete} variant="contained">
                Entrar
              </Button>
            </DialogActions>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
