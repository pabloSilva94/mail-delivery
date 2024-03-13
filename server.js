const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
// const port = 21100;
const port = 3333;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "contatobwapp@gmail.com",
    pass: "pjuaopndrbdivudj",
  },
});

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
app.use(express.json({ type: ["application/json", "text/plain"] }));

app.post("/sendmail", (req, res) => {
  const { nome, email, comentario } = req.body;
  const msg = {
    to: "contatobwapp@gmail.com",
    from: email,
    subject: "Formulario de contato ",
    text: `Nome: ${nome}\nEmail:${email}\nComentario:${comentario}`,
  };
  transporter.sendMail(msg, (error, info) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      console.log("Email enviado", info.response);
      res.sendStatus(200);
    }
  });
});
app.listen(port, () => console.log(`Servidor rodando na ${port}!`));
