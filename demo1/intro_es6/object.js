const name = 'imooc'

const obj = {
    name,
    site: 'imooc.com',
    // imooc, [variable] 计算属性 读取name的值
    [name]: 'React开发App',
    // imooctest, [variable] 计算属性
    [name + 'test']: 'test',
    sayHello() {
        console.log('hello world!')
    }
}
console.log(obj)
obj.sayHello()