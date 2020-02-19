// resolve定义一个绝对路径获取函数
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// commonjs nodejs
const port = 7070;
const title = 'vue项目最佳实践';

module.exports = {
    publicPath: 'best-practice',
    devServer: {
        port
    },
    configureWebpack: {
        name: title
    },
    chainWebpack(config) {
        // svg规则配置一下，排除icons目录
        config.module.rule('svg')
            .exclude.add(resolve('src/icons'))
            .end();
        // 新增icons规则，设置svg-sprite-loader
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({ symbolId: 'icon-[name]'}) // 使用图标名称
            .end()
    }
}