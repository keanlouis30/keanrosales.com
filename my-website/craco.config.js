const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/assets': path.resolve(__dirname, 'src/assets'),
      '@/styles': path.resolve(__dirname, 'src/styles'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
    },
    configure: (webpackConfig, { env, paths }) => {
      if (env === 'production') {
        // Replace existing CSS minimizer to disable postcss-calc warnings
        const minimizerIndex = webpackConfig.optimization.minimizer.findIndex(
          (minimizer) => minimizer.constructor.name === 'CssMinimizerPlugin'
        );
        
        if (minimizerIndex >= 0) {
          webpackConfig.optimization.minimizer[minimizerIndex] = new CssMinimizerPlugin({
            minimizerOptions: {
              preset: [
                'default',
                {
                  calc: false, // Disable postcss-calc to prevent warnings
                  discardComments: { removeAll: true },
                }
              ]
            },
          });
        }
      }
      return webpackConfig;
    },
  },
};
