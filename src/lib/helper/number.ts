export function getNumber(param: unknown) {
	return typeof param === 'number' ? param : null;
}
