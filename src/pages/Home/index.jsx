import { Box, Pagination, Stack, Typography } from "@mui/material";
import Ask from "../../components/Asks";
import { useEffect, useState } from "react";

export default function Home() {
  const [faqs, setFaqs] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    let url = "http://admin.pedabete.app.br/api/faq";
    fetch(url)
      .then((res) => res.json())
      .then((dados) => setFaqs(dados));
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
      </Typography>
      <Stack spacing={2}>
        {currentItems.map((item) => (
          <div key={item.id}>
            <Ask question={item.question} answer={item.answer} />
          </div>
        ))}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChange}
            shape="rounded"
            color="primary"
          />
        </Box>
      </Stack>
    </Box>
  );
}
