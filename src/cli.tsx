#!/usr/bin/env node
import { render } from 'ink';
import meow from 'meow';
import React from 'react';
import { App } from './app.js';

const cli = meow(
	`
	Usage
	  $ tong

	Options
		--multiplayer

	Examples
	  $ tong // Single player
	  $ tong --multiplayer
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
