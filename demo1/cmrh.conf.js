module.exports = {
  // Same scope name as in webpack build
  generateScopedName: "[name]__[local]___[hash:base64:5]"
  //下面的代码在本项目中暂时用不到，但是以下配置在我另一个项目中有用到，我来讲一下他的配置
  //扩展名
  //extensions: ['.scss','.css'],
  //钩子，这里主要做一些预处理的scss或者less文件
  //preprocessCss: (data, filename) =>
  //    require('node-sass').renderSync({
  //        data,
  //        file: filename
  //    }).css,
  //是否导出css类名，主要用于CSSModule
  //camelCase: true,
};
