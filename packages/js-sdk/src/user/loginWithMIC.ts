import { loginWithRedirectUri } from './loginWithRedirectUri';

export enum AuthorizationGrant {}

export async function loginWithMIC(redirectUri: string, authorizationGrant: AuthorizationGrant, options: any) {
  return loginWithRedirectUri(redirectUri, options);
}
