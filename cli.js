#!/usr/bin/env node
const program = require('commander');
const todo = require('./index');
const pkg = require('./package.json');
program
	.version(pkg.version);
program
	.command('add')
	.description('添加一个要做的事情')
	.action((...args) => {
		const task = args.slice(0, args.length - 1).join(' ');
		todo.add(task).then(() => {console.log('添加成功')}, () => {console.log('添加失败')})
	});
program
	.command('clear')
	.description('清除全部任务')
	.action(() => {
		todo.clear().then(() => {console.log('清除成功')}, () => {console.log('清除失败')});
	});
program.parse(process.argv);

if (process.argv.length === 2) {
	void todo.showAll()
}