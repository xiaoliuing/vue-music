const shell = require('shelljs');
const path = require('path');
const Rsync = require('rsync');
const colors = require('colors');


// linux 正常输出为0，非零为非正常输出
// 安装依赖
console.log(colors.brightYellow('开始安装依赖....'));
if (shell.exec('npm i --registry=https://registry.npm.taobao.org').code !== 0) {
  shell.echo(colors.red('Error: npm i failed'));
  shell.exit(1);
}


// 构建
console.log(colors.brightYellow('开始构建项目....'));
if (shell.exec('npm run build').code !== 0) {
  shell.echo(colors.red('Error: npm run build failed'));
  shell.exit(1);
}

// 部署
// 将打包的文件更新到服务器
console.log(colors.brightYellow('开始部署项目....'));
var rsync = Rsync.build({
  source:      path.join(__dirname, './dist/'), // 需要上传的资源目录
  destination: 'liucom:/home/xio/music',// 上传到远程服务器的目录
  exclude:     ['.git'],
  flags:       'avz',
  shell:       'ssh'
});

rsync.execute(function(error, code, cmd) {
  // error 错误信息，code 0/1，cmd 指向的命令
  console.log(error, code, cmd);
  console.log(colors.random('项目部署成功....'));
});