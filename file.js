const fs = require("fs");

// ---------------------------------------------------------------

// ---------------------------------------------------------------
//异步读取文件
//异步读取文件，读取完毕执行回调函数，回调函数中的第一个参数是错误信息，第二个参数是读取的数据
fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  if (err) return console.log("读取文件失败");
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      console.log(data3);
      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("文件写入成功");
      });
    });
  });
  console.log(data);
});
