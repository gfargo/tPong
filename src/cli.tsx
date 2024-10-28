#!/usr/bin/env node
import { render } from 'ink';
import meow from 'meow';
import React from 'react';
import { App } from './app.js';

const cli = meow(
	`
	Usage
	  $ tpong

	Options
		--multiplayer

	Examples
	  $ tpong // Single player
	  $ tpong --multiplayer
`,
	{
		importMeta: import.meta,
		flags: {
			multiplayer: {
				type: 'boolean',
			},
		},
	},
);

render(
	<App
		multiplayer={cli.flags.multiplayer ?? false}
	/>,
);
