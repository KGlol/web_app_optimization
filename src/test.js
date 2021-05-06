export default () => {
    const add = (a, b) => a + b;
    /* 将函数体用()包裹可以是v8进行eager parsing
        但是代码压缩工具会自动去调包裹函数的代码
        可以使用optimize.js 在uglify之后，再将括号加上
    */
    
    // const add = ((a, b) => a + b);
    const num1 = 1;
    const num2 = 2;
    add(num1, num2);
}