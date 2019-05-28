import { KinveyError } from './kinvey';

export class NetworkConnectionError extends KinveyError {
  constructor(message = 'There was an error connecting to the network.', debug?: string) {
    super(message, debug);
    this.name = 'NetworkConnectionError';
  }
}
