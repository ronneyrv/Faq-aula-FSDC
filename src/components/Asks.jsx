import * as React from "react";
import { useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Tooltip,
} from "@mui/material";

export default function Ask({ question, answer, id }) {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedFaqId, setSelectedFaqId] = React.useState(null);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEdit = (id) => {
    setOpenDialog(true);
    setSelectedFaqId(id);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setUsername("");
    setPassword("");
  };

  const handleLogin = () => {
    if (username === "admin" && password === "123") {
      navigate(`edit-faq/${selectedFaqId}`);
    } else {
      alert("Login ou senha incorretos.");
    }
    handleCloseDialog();
  };

  return (
    <Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">{question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ position: "relative", minHeight: 50 }}>
            <Typography>{answer}</Typography>
            <Tooltip title="Editar ou Deletar FAQ">
              <EditSquareIcon
                onClick={() => handleEdit(id)}
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  cursor: "pointer",
                  color: "primary.main",
                }}
              />
            </Tooltip>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <Box sx={{ padding: 2 }}>
          <DialogTitle>Autenticação</DialogTitle>
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
              <Button onClick={handleLogin} variant="contained">
                Entrar
              </Button>
            </DialogActions>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
