#!/usr/bin/env node
import { render } from 'ink';
import React from 'react';
// import meow from 'meow';
import App from './app.js';

// const cli = meow(
// 	`
// 	Usage
// 	  $ tong

// 	Options
// 		--name  Your name

// 	Examples
// 	  $ tong --name=Jane
// 	  Hello, Jane
// `,
// 	{
// 		importMeta: import.meta,
// 		flags: {
// 			name: {
// 				type: 'string',
// 			},
// 		},
// 	},
// );

render(
	<App
	// name={cli.flags.name}
	/>,
);
