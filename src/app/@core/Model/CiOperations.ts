import {CodeGroup, CodeProject} from './Codes';

export class CiOperations {
  id: number;
  codeGroup: CodeGroup;
  codeProject: CodeProject;
  inserted: Date;
  result: string;
  vulnNumber: number;
  sastCrit: number;
  sastHigh: number;
  openSourceCrit: number;
  openSourceHigh: number;
  imageCrit: number;
  imageHigh: number;
  commitId: string;
  imageId: string;
  sastScan: boolean;
  imageScan: boolean;
  openSourceScan: boolean;
}
