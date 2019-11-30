import {Status} from './InfraVuln';
import {WebApp} from './WebApps';

export class WebAppVuln {
  id: number;
  name: string;
  severity: string;
  description: string;
  location: string;
  status: Status;
  type: string = 'webapp';
  webApp: WebApp;
  ticketId: number;
}
