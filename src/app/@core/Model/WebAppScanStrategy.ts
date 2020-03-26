export class WebAppScanStrategy {
  apiStrategy: ScannerType;
  scheduledStrategy: ScannerType;
  guiStrategy: ScannerType;
}
export class ScannerType {
  id: number;
  name: string;
  category: string;
}
