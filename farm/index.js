/*
@Date		:2023/11/30 16:04:15
@Author		:zono
@Description:通过server.js启动服务，来了解事件循环
*/
const http = require("http");
const url = require("url");
const fs = require("fs");
const slugify = require("slugify"); //用于将字符串转换为url友好的字符串
const replaceTemplate = require("./modules/replaceTemplate"); //导入模板替换函数
// ---------------------------------------------------------------
//同步读取文件
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8"); //读取文件,该文件中存储了一些数据
const dataObj = JSON.parse(data); //将读取的数据转换为对象

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true })); //lower: true 将字符串转换为小写
console.log(slugs);

const server = http.createServer((req, res) => {
  // console.log(req);
  pathName = req.url;
  // const { query, pathName } = url.parse(req.url, true); //获取请求的query,并转换为对象
  console.log(pathName);
  // ---------------------------------------------------------------
  // 概述页面（Overview page）
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html", //设置响应类型
    }); //设置响应头

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el)) //调用模板替换函数，将模板中的占位符替换为真实数据
      .join(""); //将数组中的元素拼接为字符串
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output); //返回响应

    // 产品页面（Product page）
  } else if (pathName === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // api页面（API）
  } else if (pathName === "/api") {
    res.writeHead(200, {
      //设置响应头
      "Content-type": "application/json", //设置响应类型
    });
    res.end(data); //返回响应

    // 404页面（Not found）
  } else {
    res.writeHead(404, {
      //设置响应头
      "Content-type": "text/html", //设置响应类型
      "my-own-header": "hello-world", //设置自定义响应头
    });
    res.end("<h1>Page not found!</h1>"); //返回响应
  }
});

server.listen(7000, "127.0.0.1", () => {
  console.log("Server is running...");
});
