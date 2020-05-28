const path = require('path');
const root = path.resolve(__dirname);

const alias = {
  components: `${root}/components`,
  pages: `${root}/pages`,
  redux: `${root}/redux`,
  theme: `${root}/theme`,
  utils: `${root}/utils`,
  'jest-factories': `${root}/jest/factories`,
  'jest-utils': `${root}/jest/utils`,
};

module.exports = alias;
