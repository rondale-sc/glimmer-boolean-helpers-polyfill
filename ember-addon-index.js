const path = require('path');

module.exports = {
  name: 'glimmer-truth-helpers',
  blueprintsPath() {
    return path.join(__dirname, 'blueprints');
  }
}