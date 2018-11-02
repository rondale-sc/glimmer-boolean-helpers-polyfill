const {
  GlimmerApp
} = require('@glimmer/application-pipeline');

const build = require('@glimmer/build');
const MergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const BroccoliDebug = require('broccoli-debug');
const FileCreator = require('broccoli-file-creator');
const fs = require('fs')

module.exports = function (defaults) {
  let debugTree = BroccoliDebug.buildDebugCallback(`glimmer-boolean-helpers-polyfill`);

  let libTree = new Funnel('src', {
    destDir: 'glimmer-boolean-helpers-polyfill/src'
  });

  libTree = debugTree(libTree, 'libTree');

  let nodeModules = new MergeTrees([
    'node_modules',
    libTree,
    new FileCreator('glimmer-boolean-helpers-polyfill/package.json', fs.readFileSync('package.json', 'utf-8')),
  ]);

  nodeModules = debugTree(nodeModules, 'nodeModules');

  let app = new GlimmerApp(defaults, {
    trees: {
      src: 'tests/dummy/src',
      public: 'tests/dummy/public',
      styles: 'tests/dummy/src/ui/styles',
      nodeModules
    }
  });

  let testTree = new Funnel('tests', {
    exclude: ['dummy']
  })

  testTree = debugTree(testTree, 'testTree');

  let appTree = debugTree(app.toTree(), 'appTree');

  appTree = new MergeTrees([
    appTree,
    testTree
  ], {
    overwrite: true 
  });

  appTree = new Funnel(appTree, {
    destDir: 'tests'
  });

  return new MergeTrees([appTree, libTree])
}