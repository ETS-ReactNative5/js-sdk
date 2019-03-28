export const Identity = 'kinveyAuth';

export function getVersion(version: string = '3') {
  return String(version).indexOf('v') === 0 ? version : `v${version}`;
}
