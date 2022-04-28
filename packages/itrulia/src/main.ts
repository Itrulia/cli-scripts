import * as process from 'process';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { execute as blamePort } from '@cli-scripts/blame-port';
import { execute as killPort } from '@cli-scripts/kill-port';

async function execute() {
  const {
    _: [command, ...args],
  } = yargs(hideBin(process.argv)).argv;
  console.log();

  switch (command) {
    case 'kill-port': {
      const [port] = args;
      killPort(+port);
      break;
    }

    case 'blame-port': {
      const [port] = args;
      blamePort(+port);
      break;
    }
  }
}

execute();
