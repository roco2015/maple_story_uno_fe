const tsImportPluginFactory = require('ts-import-plugin');
const path = require('path');

module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          hack: `true; @import '${path.resolve(__dirname, './src/assets/css/vant-custom.less')}';`,
        },
      },
    },
  },
  configureWebpack: {
    resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            transpileOnly: true,
            getCustomTransformers: () => ({
              before: [
                tsImportPluginFactory({
                  appendTsSuffixTo: [/\.vue$/],
                  libraryName: 'vant',
                  libraryDirectory: 'es',
                  style: name => `${name}/style/less` // 配置vant主题文件
                })
              ]
            }),
            compilerOptions: {
              module: 'es2015'
            }
          }
        }
      ]
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: ['./src/assets/css/main.less']
    }
  }
};
