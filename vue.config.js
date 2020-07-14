const webpack = require('webpack')
const path = require('path')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')

const isBuild = ['build'].includes(process.argv[2])

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    lintOnSave: false,
    devServer: {
        disableHostCheck: true,
        port: 8886
    },
    css: {
        extract: true,
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-plugin-px2rem')({
                        rootValue: 75,
                    }),
                ]
            },
        }
    },
    configureWebpack: (config) => {
        if(isBuild) {
            // vue压缩代码插件配置
            config.plugins.push(new FileManagerPlugin({
                onEnd: {
                    copy: [
                        { source: 'dist', destination: 's/s' }
                    ],
                    archive: [
                        { source: 's', destination: 's.zip' }
                    ],
                    delete: [
                        's'
                    ]
                }
            }))
        }
        // vue骨架屏插件配置
        config.plugins.push(new SkeletonWebpackPlugin({
            webpackConfig: {
                entry: {
                    app: path.join(__dirname, './src/entry-skeleton.js'),
                },
            },
            minimize: true,
            quiet: true,
        }))

        // vue压缩代码插件配置
        config.plugins.push(new FileManagerPlugin({
            onEnd: {
                copy: [
                    { source: 'dist', destination: 's/s' }
                ],
                archive: [
                    { source: 's', destination: 's.zip' }
                ],
                delete: [
                    's'
                ]
            }
        }))
    },
    chainWebpack(config) {
        const oneOfsMap = config.module.rule('less').oneOfs.store
        oneOfsMap.forEach(item => {
            item
                .use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    // Provide path to the file with resources
                    resources: resolve('./src/assets/style/variables.less')
                })
                .end()
        })
        config.plugins
            .delete('prefetch')
            .delete('preload')
        config.resolve.alias
            .set('@', resolve('src'))
            .set('components', resolve('src/components'))
            .set('assets', resolve('src/assets'))
            .set('api', resolve('src/api'))
        config.plugin('context')
            .use(webpack.ContextReplacementPlugin,
                [/moment[/\\]locale$/, /zh-cn/])
        // svg
        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        svgRule
            .include
            .add(resolve('src/assets/svg-icons/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'd2-[name]'
            })
            .end()
        // image exclude
        const imagesRule = config.module.rule('images')
        imagesRule
            .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
            .exclude
            .add(resolve('src/assets/svg-icons/icons'))
            .end()
    },
    publicPath: ''
}