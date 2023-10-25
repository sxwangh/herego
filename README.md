herego 只需要一行命令($ npx herego)，就可以将当前目录变成一个静态文件服务器。可以选择是否开启访问鉴权，可以自定义访问用户名和密码
==============================

## Usage without install
```sh
// 在当前目录开启静态资源服务 --默认访问路径localhost:8888
$ npx herego

// 在当前目录开启静态资源服务: 自定义端口8080  --默认访问路径localhost:8080
$ npx herego 8080

// 在当前目录开启静态资源服务: 设置访问鉴权用户名wsx,密码123 --默认访问路径localhost:8888
$ npx herego wsx 123

// 在当前目录开启静态资源服务: 自定义端口8080,设置访问鉴权用户名wsx,密码123 --默认访问路径localhost:8888
$ npx herego 8080 wsx 123

```
## Usage without Install

#### install

```sh
$ npm install herego -g
```
#### use

```sh
// run with default port 8888
$ herego

// run with ${port}
$ herego 8080

// run with ${username} ${password}
$ herego wsx 123

// run with ${port} ${username} ${password}
$ herego 8080 wsx 123

```

## TODO commander Help

```sh
$ herego --help
Usage:
  herego --help // print help information
  TODO
```

