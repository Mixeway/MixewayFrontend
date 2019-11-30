import {Status} from './InfraVuln';
import {CodeGroup} from './Codes';

export class CodeVuln {
  id: number;
  name: string;
  severity: string;
  analysis: string;
  filePath: string;
  description: string;
  inserted: Date;
  status: Status;
  type: string = 'code';
  codeGroup: CodeGroup;
  ticketId: number;
}
