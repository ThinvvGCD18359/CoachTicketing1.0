const express = require("express");
const cors = require("cors");
const route = require("./routes");


const PORT = process.env.PORT || 3001;
const app = express();


app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

route(app)

app.listen(PORT, () => console.log("The server is running on http://localhost:3001"));