import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

export default function Header() {
  const navigate = useNavigate();
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Tooltip title="Home">
            <Box
              component={Link}
              to="/"
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
                mr: 2,
              }}
            >
              <QuestionAnswerIcon sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                sx={{
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  textDecoration: "none",
                }}
              >
                FAQ
              </Typography>
            </Box>
          </Tooltip>
          <Box
            component={Link}
            to="/"
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              flexGrow: 1,
            }}
          >
            <QuestionAnswerIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: ".2rem",
                textDecoration: "none",
                fontSize: "1rem",
              }}
            >
              FAQ
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, ml: "auto" }}>
            <AddToPhotosIcon
              onClick={() => navigate("add-faq")}
              sx={{
                fontSize: 28,
                cursor: "pointer",
                color: "inherit",
              }}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
