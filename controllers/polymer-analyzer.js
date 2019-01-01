'use strict'


const { Analyzer, FsUrlLoader, PackageUrlResolver } = require('polymer-analyzer');

const rootDir = process.cwd();
const analyzer = new Analyzer({
  urlLoader: new FsUrlLoader(rootDir),
  urlResolver: new PackageUrlResolver({ packageDir: rootDir }),
});
var handleR = require('./handlerResponse.js')

// This path is relative to the root dir

class polymerAnalyzer extends handleR {
  constructor() {
    super()
  }
  async analyzer(req, res) {
    analyzer.analyze([req.body]).then((analysis) => {
      // Print the name of every property on paper-button, and where it was
      // inherited from.
      const [paperButton] = analysis.getFeatures(
        { kind: 'element', id: 'paper-button', externalPackages: true });
      if (paperButton) {
        for (const [name, property] of paperButton.properties) {
          let message = `${name}`;
          if (property.inheritedFrom) {
            message += ` inherited from ${property.inheritedFrom}`;
          } else {
            message += ` was defined directly on paper-button`;
          }
          super.getOK(res, req, message)
        }
      } else {
        let message=`my-element.html didn't define or import paper-button.`;
        super.getOK(res, req, message)
      }
    });
  }
}
module.exports.polymerAnalyzer = polymerAnalyzer;