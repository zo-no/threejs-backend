/*
@Date		:2023/11/30 16:04:15
@Author		:zono
@Description:通过server.js启动服务，来了解事件循环
*/
const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const pathName = req.url; //获取请求的路径
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW"); //返回响应
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");
  } else {
    res.writeHead(404, {
      //设置响应头
      "Content-type": "text/html", //设置响应类型
      "my-own-header": "hello-world", //设置自定义响应头
    });
    res.end("<h1>Page not found!</h1>"); //返回响应
  }
});

server.listen(8000, () => {
  console.log("Server is running...");
});
