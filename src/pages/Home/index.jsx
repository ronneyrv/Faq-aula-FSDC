import { Card } from "@mui/material";
import Ask from "../../components/Asks";
import { useEffect, useState } from "react";

export default function Home() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    let url = "http://admin.pedabete.app.br/api/faq";
    fetch(url)
      .then((res) => res.json())
      .then((dados) => setFaqs(dados));
  }, []);
  return (
    <div>
      {console.log(faqs)}
      <Card sx={{ margin: 5 }}>
        <h1>Lista FAQ</h1>
        {faqs.map((item) => (
  <div key={item.id}>
    <Ask question={item.question} answer={item.answer} />
  </div>
))}
      </Card>
    </div>
  );
}
