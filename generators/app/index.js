const Generator = require('yeoman-generator');
const { spawn } = require('child_process');
module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.argument('appname', {
            type:String, 
            required: true, 
            description: 'The name of HTML app to create.'
        });
    }

    writing() {
        const files = [
            'src/layouts/main.pug',
            'src/index.pug',
            'scripts/pug.js',
            'src/js/app.js',
            'src/scss/_bulma.scss',
            'src/scss/_variables.scss',
            'src/scss/main.scss',
            '.babelrc',
            '.gitignore'
        ];

        // copy all files
        files.forEach(file => this.fs.copyTpl(this.templatePath(file), this.destinationPath(file)));

        this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), {appname: this.options.appname});
    }

    install() {
        this.spawnCommandSync('mkdir', ['src/img']);
        this.spawnCommandSync('git', ['init']);
        this.npmInstall();
        this.spawnCommandSync('git', ['add', '.']);
        this.spawnCommandSync('git', ['commit', '-m', 'Initial commit']);
    }

    end() {
        this.log(this.options.appname + ' installed successfully.');
    }
}