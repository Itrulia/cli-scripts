import * as sh from 'shell-exec';
import { platform } from 'process';
import { strict as assert } from 'assert';
import { compose } from 'ramda';
import * as logSymbols from 'log-symbols';
import * as chalk from 'chalk';
import * as boxen from 'boxen';

const blamePort = async (port: number) => {
  assert.notEqual(platform, 'win32', 'Windows is currently not supported');

  const { stdout: result }: { stdout: string } = await sh(
    `lsof -Fca -Pi :${port} -sTCP:LISTEN`
  );

  if (!result) {
    compose(
      console.log,
      chalk.green
    )(`${logSymbols.success} no programm is occupying port ${port}.`);

    return;
  }

  compose(
    console.log,
    chalk.red,
    (log) => boxen(log as string, { padding: 1 }),
    ([process, processName]) =>
      `${logSymbols.error} process ${processName}, with id ${process}, is occupying port ${port}.`
  )(result.split('\n').map((value) => value.substring(1)));
};

export const execute = blamePort;
