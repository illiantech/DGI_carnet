import { useEffect } from 'react';

export function useSEO({ title }) {
	useEffect(() => {
		document.title = title;
	}, [title]);
}
