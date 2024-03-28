const { Command } = require('commander')
const program = new Command()
const { publish, fetch, discover, ping } = require('./server')
const File = require('./models/fileModel')

// Function

program
  .name('string-util')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0')

program
  .command('publish <username> <lname> <fname>')
  .alias('a')
  .description('Publish a filename')
  .action(async (username, lname, fname) => {
    try {
      const user = await publish(username, lname, fname)
    } catch (err) {
      console.log(err)
    }
  })

program
  .command('fetch <username> <fname>')
  .alias('a')
  .description('Publish a filename')
  .action(async (username, fname) => {
    try {
      const user = await fetch(username, fname)
    } catch (err) {
      console.log(err)
    }
  })

program
  .command('discover <hostname>')
  .alias('a')
  .description('Discover the list of local files of the host named hostname')
  .action(async (hostname) => {
    try {
      const files = await discover(hostname)
    } catch (err) {
      console.log(err)
    }
  })

program
  .command('ping <hostname>')
  .alias('a')
  .description('live check the host named hostname')
  .action(async (hostname) => {
    try {
      const user = await ping(hostname)
    } catch (err) {
      console.log(err)
    }
  })
program.parse(process.argv)
