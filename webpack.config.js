const path = require('path');
const webpack = require('webpack');
const env = require('./env');

// 定义源码和构建结果的路径
const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');
const TEM_PATH = path.resolve(ROOT_PATH, 'templates');
const HUI_PATH = path.resolve(ROOT_PATH, 'node_modules/hui-vue/src');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // 项目入口. 可以直接用文件夹名称, 默认会找 index.js; 也可以确定是哪个文件名字
  entry: {
    fullpage: '@/fullpage.js',
    blog: '@/blog.js',
    mobile: '@/mobile.js',
    admin: '@/main.js'
  },
  // 项目出口. 让 webpack 把处理完成的文件放在哪里
  output: {
    path: DIST_PATH,
    filename: '[name].js'
  },
  // 模块. 要用什么不同的模块来处理各种类型的文件
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.(js|vue)$/,
      exclude: /node_modules/,
      use: {
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      }
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          less: ExtractTextPlugin.extract({fallback: 'vue-style-loader', use: 'css-loader!postcss-loader!less-loader'})
        }
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [SRC_PATH, HUI_PATH]
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({use: 'css-loader!postcss-loader'})
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({use: 'css-loader!postcss-loader!less-loader'})
    }, {
      test: /\.(ttf|eot|woff|woff2)$/,
      loader: 'url-loader?limit=40000'
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url-loader?limit=20000'
    }]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': SRC_PATH,
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:8090',
        secure: false
      }
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
  ]
};
