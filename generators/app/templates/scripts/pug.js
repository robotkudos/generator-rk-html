const pug = require('pug');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const log = require('rk-log-beautify');
const prettier = require('prettier');

fs.readdirSync('src').forEach(file => {
    if (path.extname(file) === '.pug') {
        try {
            let html = pug.renderFile(path.join('src', file));
            html = prettier.format(html, {
                printWidth: 1000,
                tabWidth: 4,
                singleQuote: true,
                proseWrap: 'preserve',
                endOfLine: 'lf',
                parser: 'html'
            });
            fs.writeFileSync(path.join('dist', path.basename(file, '.pug') + '.html'), html);
            log.success(path.basename(file) + ' => ' + path.basename(file, '.pug') + '.html', 'PUG:');
        } catch(e) {
            log.error(e);
        }
    }
});

