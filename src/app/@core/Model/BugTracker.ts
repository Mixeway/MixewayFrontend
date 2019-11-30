import {Project} from './Project';

export class BugTrackerType {
  id: number;
  name: string;
}
export class BugTracker {
  id: number;
  bugTrackerType: BugTrackerType;
  url: string;
  username: string;
  password: string;
  projectId: string;
  issueType: string;
  vulns: string;
  project: Project;
  autoStrategy: string;
  asignee: string;
}
