const { override, fixBabelImports, addLessLoader } = require('customize-cra');
const './style/default.less';

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        // modifyVars: { '@primary-color': '#1DA57A' },
        modifyVars: { '@primary-color': @primaryColor }
    }),
);