/*
@Date		:2023/11/10 15:01:34
@Author		:zono
@Description:用express写一个小后端
*/
const express = require("express");

const app = express();

app.get("/", (request, response) => {
  response.send("Hello World");
});

app.listen(8000, () => {
  console.log("Server is running at port 8000");
});
