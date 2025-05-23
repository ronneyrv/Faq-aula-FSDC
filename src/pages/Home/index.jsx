import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import Ask from "../../components/Asks";
import {
  Box,
  Pagination,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";

export default function Home() {
  const [faqs, setFaqs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    let url = "http://localhost:3001/faq";
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((dados) => {
        setFaqs(dados);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = faqs.slice(startIndex, endIndex);
  const totalPages = Math.ceil(faqs.length / itemsPerPage);

  return (
    <Box
      sx={{
        margin: "40px auto",
        maxWidth: 800,
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
        Lista de Perguntas Frequentes (FAQ)
        <AddToPhotosIcon
          sx={{
            marginLeft: 10,
            fontSize: 35,
            cursor: "pointer",
            color: "primary.main",
          }}
          onClick={() => navigate(`add-faq`)}
        />
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5, mb: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Stack spacing={2}>
          {currentItems.map((item) => (
            <div key={item.id}>
              <Ask question={item.question} answer={item.answer} id={item.id} />
            </div>
          ))}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 3,
            }}
          >
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChange}
              shape="rounded"
              color="primary"
            />
          </Box>
        </Stack>
      )}
    </Box>
  );
}
