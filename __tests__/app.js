'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

let files = [
  'tslint.json',
  'tsconfig.json',
  'README.md',
  'protractor.conf.js',
  'package.json',
  'karma.conf.js',
  '.gitignore',
  'gulpfile.js',
  '.editorconfig',
  '.angular-cli.json',
  'e2e',
  'server',
  'client/index.html',
  'client/styles.css',
  'client/app/app.module.ts',
]

let fronts = ['None', 'Angular Material', 'Bootstrap', 'Bulma']

for (let f of fronts) {
  describe('generator-angular-api:app Front-end = ' + f, () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          name: 'name',
          description: 'description',
          style: f,
        });
    });

    it('create files', () => {
      assert.file(files);
    });

    it('check configs', () => {
      if (f === 'Angular Material') {
        assert.fileContent('client/styles.css', /@import '~@angular\/material\/prebuilt-themes\/deeppurple-amber\.css';/);
      } else if (f === 'Bootstrap') {
        assert.fileContent('.angular-cli.json', /"\.\.\/node_modules\/bootstrap\/dist\/js\/bootstrap\.bundle\.min\.js"/);
      } else if (f === 'Bulma') {
        assert.fileContent('.angular-cli.json', /"\.\.\/node_modules\/bulma\/css\/bulma\.css"/);
      } else {
        assert.fileContent('.angular-cli.json', /"styles": \["styles\.css"\]/);
      }
    });

  });
}
