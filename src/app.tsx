import React from 'react';
import { Pong } from './Pong.js';

export default function App({multiplayer}: {multiplayer: boolean}) {
	return <Pong multiplayer={multiplayer} />;
}
