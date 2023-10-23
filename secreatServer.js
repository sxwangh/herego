const serveStatic = require('serve-static');
const serveIndex = require('serve-index');
const express = require('express');
const commander = require('commander');
const chalk = require('chalk');
const app = express();

// 变量
let PORT = 8888;
let USERNAME = '';
let PASSWORD = '';
let auth = ''; // 鉴权

// 1、初始命令传参
commander.parse(process.argv);
if (commander.args.length === 3) { // here ${port} ${username} ${password}
    PORT = commander.args[0];
    USERNAME = commander.args[1];
    PASSWORD = commander.args[2];
} else if (commander.args.length === 2) { // here ${username} ${password}
    USERNAME = commander.args[0];
    PASSWORD = commander.args[1];
} else if (commander.args.length === 1) { // here ${port}
    PORT = commander.args[0];
}

console.log('init PORT: ', PORT);
console.log('init USERNAME: ', USERNAME);
console.log('init PASSWORD: ', PASSWORD);

const doAuth = USERNAME && USERNAME;


if (doAuth) {
    auth = Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64');
    auth = `Basic ${auth}`;
    console.log('预设auth:', auth);
}

// app.use('', () => {});
app.use(function (request, response, next){
    if (request) {
        console.log('被访问api url:' + request.url);
        console.log('request header Authorization:', request.header('Authorization'));
        //  Authorization:Basic c2NhcjoxMjM0NTY=
        //  Authorization: <type> <credentials>
        // 格式是Basic字符串+空格+用户名:密码的Base64编码
        // 需要鉴权（用户名密码不正确） || 不需要鉴权
        if (doAuth && request.header('Authorization') === auth || !doAuth) {
            next();
        } else {
            // http鉴权 浏览器alert 用户名和密码，提交后重新提交get请求，用户名和密码组合成base64放到请求header中
            response.header('WWW-Authenticate', 'Basic');
            response.header('Content-type', 'text/html');
            response.sendStatus(401);
        }
    }
});

// process.cwd()当前目录下
// static
// 1、指定要提供静态文件服务的文件夹路径作为参数传递给serveStatic()函数。在上面的例子中，将会在根路径"/"下提供名为"public"的文件夹中的静态文件。
// 配置默认展示的文件为index.html，如果没有，则展示文件列表
app.use(serveStatic(process.cwd(), { 'index': ['index.html'] }));
// 2、指定要显示目录列表的文件夹路径作为参数传递给serveIndex()函数。在上面的例子中，将会在根路径"/"下显示名为"public"的文件夹的目录列表。
app.use(serveIndex(process.cwd(), { 'icons': true }));

app.listen(PORT);
console.log(chalk.green(`\n Running at : http:localhost:${PORT} \n`));
//base64转化
// console.log(Buffer.from("Hello World").toString('base64'));
// console.log(Buffer.from("SGVsbG8gV29ybGQ=", 'base64').toString('ascii'));
