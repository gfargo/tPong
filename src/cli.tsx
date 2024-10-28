#!/usr/bin/env node
import { render } from 'ink';
import meow from 'meow';
import React from 'react';
import App from './app.js';

const cli = meow(
	`
	Usage
	  $ tong

	Options
		--two-player

	Examples
	  $ tong // Single player
	  $ tong --two-player // Two players
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
