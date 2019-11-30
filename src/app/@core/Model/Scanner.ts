import {RoutingDomain} from './RoutingDomain';

export class Scanner {
  id: number;
  status: boolean;
  usePublic: boolean;
  routingDomain: RoutingDomain;
  scannerType: ScannerType;
  rfwUrl: string;
  apiUrl: string;
}
export class ScannerType {
  id: number;
  name: string;
}
