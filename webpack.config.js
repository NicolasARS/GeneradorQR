// webpack.config.js

const Encore = require('@symfony/webpack-encore');
const webpack = require('webpack');


Encore
     // Define el directorio donde se almacenarán los assets compilados
     .setOutputPath('public/build/')
    
     // Define la ruta pública utilizada por el servidor web para acceder al directorio de salida
     .setPublicPath('/build')
    
    .addEntry('efectos', './assets/js/efectosTipoQr.js') // Tu script personalizado
    
    .addPlugin(new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
    }))
    .enableSingleRuntimeChunk()
;

module.exports = Encore.getWebpackConfig();