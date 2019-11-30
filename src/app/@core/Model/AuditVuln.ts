import {Status} from './InfraVuln';

export class AuditVuln {
  id: number;
  score: string;
  updated: Date;
  node: NodeModel;
  requirement: Requirement;
  type: NodeType;
  status: Status;
}
export class NodeModel {
  id: number;
  name: string;
  type: string;
}
export class Requirement {
  code: string;
  name: string;
  severity: number;
}
export class NodeType {
  name: string;
}
