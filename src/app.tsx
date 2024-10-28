import React from 'react';
import { Pong } from './Pong.js';

export default function App({multiplayer}: {multiplayer: boolean}) {

	if (multiplayer) {
		console.log('Two player mode is not implemented yet');
		return null;
	}


	return <Pong multiplayer={multiplayer} />;
}
