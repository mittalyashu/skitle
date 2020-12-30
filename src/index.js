const {Command, flags} = require('@oclif/command')
class PgdiffCommand extends Command {
  async run() {
    const {flags} = this.parse(PgdiffCommand)

    if (!flags.source || !flags.destination) {
      this.error('--source or --destination flag is missing')
    }
  }
}

PgdiffCommand.description = `Create SQL schema diff

Create schema difference by comparing two different databases.
`

PgdiffCommand.flags = {
  source: flags.string({char: 's'}),
  destination: flags.string({char: 'd'}),
  version: flags.version({char: 'v'}),
  help: flags.help({char: 'h'}),
}

module.exports = PgdiffCommand
