import React from 'react';
import { BlackModeIcon, WhiteModeIcon } from './icons';
import { useBlackMode } from '../hooks/useBlackMode';

const prefTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

export function BtnBlackMode() {
	const { handleBlackMode, classBlackMode, titileBlackMode, blackMode } = useBlackMode({ prefTheme });

	return (
		<button onClick={handleBlackMode} className={classBlackMode} title={titileBlackMode}>
			<div className="black-mode--container">{blackMode ? <WhiteModeIcon /> : <BlackModeIcon />}</div>
		</button>
	);
}
