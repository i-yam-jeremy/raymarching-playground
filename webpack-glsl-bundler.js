const ConcatSource = require('webpack-sources/lib/ConcatSource')
const CachedSource = require('webpack-sources/lib/CachedSource')
const fs = require('fs')

const GLSL_BOILERPLATE_SOURCE_FILE = './src/components/node/compiler/glsl-boilerplate.glsl'

class GLSLBundlerPlugin {

  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      'GLSLBundlerPlugin',
      (compilation, callback) => {
        fs.readFile(GLSL_BOILERPLATE_SOURCE_FILE, (err, data) => {
          if (err) {
            throw err
          }

          let glslJsSource = 'const SDF_GLSL_BOILERPLATE_SOURCE = `' + data + '`;\n'
          let source = new ConcatSource(glslJsSource, compilation.assets['main.js'])
          compilation.assets['main.js'] = new CachedSource(source)

          callback()
        })
      }
    );
  }

}

module.exports = GLSLBundlerPlugin
