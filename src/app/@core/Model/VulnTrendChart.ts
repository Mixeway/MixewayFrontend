export class VulnTrendChart {
  legends: string[];
  dates: string[];
  series: VulnTrendSerie[];
}
export class VulnTrendSerie {
  name: string;
  values: string[];
}
