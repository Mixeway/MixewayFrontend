import {Project} from './Project';

export class InfraVuln {
  constructor() {
    this.type = 'infra';
  }
  id: number;
  intf: Interface;
  name: string;
  threat: string;
  port: string;
  description: string;
  inserted: Date;
  status: Status;
  type: string = 'infra';
  ticketId: number;
}
export class Interface {
  privateip: string;
  asset: Asset;
}
export class Asset {
  id: number;
  name: string;
  project: Project;
}
export class Status {
  name: string;
}
