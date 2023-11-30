/*
@Date		:2023/11/10 15:00:56
@Author		:zono
@Description:纯原生js写法，与express无关
*/
// 简单用js写了个接口，利用nodejs来发送请求，返回数据
const http = require('http')
http.createServer((req, res) => {
    //rep是应答对象，其有writeHead方法，可以设置返回的http状态码和http头
    // res是应答对象，其有end方法，可以设置返回的内容
    if(req.method === 'GET' && req.url === '/123'){
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
        res.end('响应了123请求')
    }else if(req.method === 'POST' && req.url === '/321'){
        let data = ''
        req.on('data', chunk => {
            data += chunk
        })
        req.on('end', () => {
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.end('响应了321请求')
        })
    }else{
        res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
        res.end('404')
    }
}).listen(5000,()=>{
    console.log('server is running on port 3000')
})
