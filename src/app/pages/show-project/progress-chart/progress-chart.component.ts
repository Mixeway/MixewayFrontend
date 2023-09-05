import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-progress-chart',
  template: `
    <div echarts [options]="options" class="echart"></div>

  `,
})
export class ProgressChartComponent implements OnInit {

  options: any = {};
  constructor() {
    const progressLineLength = 500;
    const maxValue = 100;
    const value = 70;
    this.options = {
      title: {
        padding: [0, 0, 0, 100],
        text: 'Detected Vulnerabilities: 1234',
        subtext: 'Resolved Vulnerabilities: 123',
        textAlign: 'center',
        textStyle: {
          fontSize: 28,
          fontWeight: 'bold',
        },
        subtextStyle: {
          fontSize: 28, // Adjust the subtext font size as needed
          fontWeight: 'bold',
        },
        left: 'center',
        top: 10,
      },
      graphic: {
        elements: [
          {
            type: 'group',
            left: 'center',
            top: 'center',
            children: [
              {
                type: 'rect',
                shape: {
                  x: 0,
                  y: 0,
                  width: progressLineLength,
                  height: 10,
                },
                style: {
                  fill: '#E5E5E5',
                },
              },
              {
                type: 'rect',
                shape: {
                  x: 0,
                  y: 0,
                  width: progressLineLength * value / maxValue,
                  height: 10,
                },
                style: {
                  fill: '#3874CB',
                },
                keyframeAnimation: {
                  duration: 1000,
                  loop: false,
                  keyframes: [
                    {
                      percent: 0,
                      scaleX: 0,
                    },
                    {
                      percent: 1,
                      scaleX: 1,
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    };
  }

  ngOnInit(): void {
  }

}
