const path = require('path');
const Funnel = require('broccoli-funnel');
const BroccoliDebug = require('broccoli-debug');
const MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'glimmer-boolean-helpers-polyfill',
  blueprintsPath() {
    // disable blueprints for now
    return null;
  },
  preprocessTree(type, tree) {
    if (type === 'src') {
      let debugTree = BroccoliDebug.buildDebugCallback(`glimmer-truth-helpers`);

      let helperTree = debugTree(new Funnel(path.join(__dirname, 'src', 'glimmer-helpers'), 'helperTree'));

      tree = debugTree(tree, 'srcTree');

      let outputTree = debugTree(new MergeTrees([helperTree, tree]), 'outputTree')

      return outputTree;
    } else {
      return tree;
    }
  }
}