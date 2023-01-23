import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AllVulnTrendData} from '../../@core/Model/AllVulnTrendData';
import {ShowProjectService} from '../../@core/service/ShowProjectService';
import {DashboardService} from '../../@core/service/DashboardService';
import {AllSourceDataChart} from '../../@core/Model/AllSourceDataChart';
import * as echarts from 'echarts';
import {NbThemeService} from '@nebular/theme';
import {VulnmanageColorComponent} from '../extra-components/vulnmanage-color.component';
import {MixerProgresComponent} from '../extra-components/mixer-progres/mixer-progres.component';
import {Project} from '../../@core/Model/Project';
import {DashboardConstants} from '../../@core/constants/DashboardConstants';
import {Router} from '@angular/router';
import {DashboardStat} from '../../@core/Model/DashboardStat';
type EChartsOption = echarts.EChartsOption;


@Component({
  selector: 'ngx-stats-dashboard',
  templateUrl: './stats-dashboard.component.html',
  styleUrls: ['./stats-dashboard.component.scss'],
})
export class StatsDashboardComponent implements OnInit, AfterViewInit {

  trendResponse: AllVulnTrendData[];
  projectOptions: EChartsOption;
  vulnOptions: EChartsOption;
  themeSubscription: any;
  projects: Project[] = [];
  projectData: any;
  vulnDataNames: any;
  vulnDataOccurances: any;
  role: string;
  settings: any;
  loading: boolean = true;
  constants: DashboardConstants = new DashboardConstants();
  dashboardStat: DashboardStat;
  constructor(private showProjectService: ShowProjectService,
              private dashboardService: DashboardService,
              private theme: NbThemeService,
              private router: Router) {
    this.loadTrendData();
    this.loadSettings();
    this.getProjects();
    this.getStats();

  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.projectOptions = {
        dataset: {
          source: this.projectData,
        },
        grid: { containLabel: true },
        xAxis: { name: 'Vulns.' },
        yAxis: {
          type: 'category',
        },
        visualMap: {
          orient: 'horizontal',
          left: 'center',
          min: 10,
          max: 100,
          text: ['High Risk', 'Low Risk'],
          // Map the score column to color
          dimension: 0,
          inRange: {
            color: ['#65B581', '#FFCE34', '#FD665F'],
          },
        },
        series: [
          {
            type: 'bar',
            encode: {
              // Map the "amount" column to X axis.
              x: 'vulnerabilities',
              // Map the "product" column to Y axis
              y: 'project',
            },
          },
        ],
      };
      this.vulnOptions = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        xAxis: {
          data: this.vulnDataNames,
          axisLabel: {
            rotate: 60,
            width: 30,
            height: 50,
          },
        },
        yAxis: {},
        series: [
          {
            name: 'Vulnerability',
            data: this.vulnDataOccurances,
            type: 'bar',
            stack: 'x',
            itemStyle: {color: '#2e89db'},
          },
        ],
      };
    });
  }

  loadTrendData() {
    return this.dashboardService.getTrendData().subscribe(data => {
      this.trendResponse = data.reverse();
    });
  }

  ngOnInit(): void {
  }
  loadSettings() {
    this.settings = {
      actions: {
        add: false,
        edit: false,
        delete: false,
        custom: [
          {
            name: 'swap',
            title: '<i class="nb-search"></i>',
          },
        ],
      },
      columns: {
        name: {
          title: this.constants.DASHBOARD_RABLE_PROJECT_NAME,
          type: 'html',
          valuePrepareFunction: (cell) => {
            return `<b>${cell}</b>`;
          },
          width: '20%',
        },
        description: {
          title: this.constants.DASHBOARD_TABLE_DESCRIPTION,
          type: 'string',
          width: '35%',
        },
        risk: {
          title: this.constants.DASHBOARD_TABLE_RISK,
          type: 'custom',
          sortDirection: 'desc',
          addable: false,
          editable: false,
          width: '25%',
          renderComponent: MixerProgresComponent,
          filter: false,
        },
      },
    };
  }
  getProjects() {
    return this.dashboardService.getProjects().subscribe(downloaded => {
      this.projects = downloaded;
      this.loading = false;
    });
  }
  getStats() {
    return this.dashboardService.stats().subscribe(stat => {
      this.dashboardStat = stat;
      this.projectData = [ ['score', 'vulnerabilities', 'project']];
      this.dashboardStat.projectStats.forEach( ps => this.projectData.push([ps.risk, ps.vulnerabilities,
        ps.name.length >= 8 ? ps.name.substring(0, 8 ) + '..' : ps.name]));
      this.vulnDataNames = this.dashboardStat.vulnStats.map(vs => vs.name);
      this.vulnDataOccurances = this.dashboardStat.vulnStats.map(vs => vs.occurances);
    });
  }

  open(event) {
    this.router.navigate(['/pages/show/project/' + event.data.id]);
  }
}
