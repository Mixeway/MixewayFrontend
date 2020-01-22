import {Project} from './Asset';

export class Codes {
  codeAutoScan: boolean;
  codeModels: Code[];
}
export class Code {
  id: number;
  codeProject: CodeProject;
  risk: number;
  running: boolean;
}
export class CodeProject {
  id: number;
  codeGroup: CodeGroup;
  name: string;
  dTrackUuid: string;
}
export class CodeGroup {
  name: string;
  id: number;
  project: Project;
}
