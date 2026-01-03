export function getString(param: unknown) {
	return typeof param === 'string' ? param : '';
}
