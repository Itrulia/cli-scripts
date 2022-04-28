import * as sh from 'shell-exec';
import { platform } from 'process';
import { strict as assert } from 'assert';
import { compose } from 'ramda';
import * as logSymbols from 'log-symbols';
import * as chalk from 'chalk';

const killPort = async (port: number) => {
  assert.notEqual(platform, 'win32', 'Windows is currently not supported');

  await sh(
    `lsof -ni tcp:${port} | grep 'LISTEN' | awk '{print $2}' | xargs kill -9`
  );

  compose(
    console.log,
    chalk.green
  )(`${logSymbols.success} all processes closed for port ${port}.`);
};

export const execute = killPort;
