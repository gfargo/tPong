import test from 'ava'
import chalk from 'chalk'
import { render } from 'ink-testing-library'
import React from 'react'
import { App } from './src/app.js'

test('Singleplayer basic boot test', (t) => {
  const { lastFrame } = render(<App multiplayer={false} />)

  t.is(lastFrame(), `Hello, ${chalk.green('Stranger')}`)
})

test('Multiplayer basic boot test', (t) => {
  const { lastFrame } = render(<App multiplayer={true} />)

  t.is(lastFrame(), `Hello, ${chalk.green('Jane')}`)
})
