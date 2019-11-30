import {CodeProject} from './Codes';
import {Status} from './InfraVuln';

class SoftwarePacket {
  name: string;
}

class SoftwarePacketVulnerability {
  name: string;
  description: string;
  inserted: string;
  severity: string;
  softwarepacket: SoftwarePacket;
  type: string = 'opensource';
  ticketId: number;
}

export class SoftVuln {
  codeProject: CodeProject;
  softwarePacketVulnerability: SoftwarePacketVulnerability;
  status: Status;
}
