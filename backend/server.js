const express = require("express");
const http = require("http");
const env = require("dotenv").config();
const PORT = process.env.PORT || 8082;
const app = express();

const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const Router = require("./routes/v1");
const { error, notFound } = require("./middlewares/error.middleware");
const dbConnection = require("./config/db.config");
dbConnection();
let cors = require("cors");

// app.use(
//   cors({
//     origin: `http://${config.workspaceIp}:${process.env.FRONTEND_PORT}`,
//     allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
//     credentials: true,
//   })
//  );

//socket connection
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use(cors());
app.use(express.json());

app.use("/v1", Router);
app.use(notFound);
app.use(error);

console.log("comes");

server.listen(PORT, () => {
  console.log(`you are listening port ${PORT}...`);
});
