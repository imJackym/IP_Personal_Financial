import { Component, OnInit } from '@angular/core'
import * as Chartist from 'chartist'

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {
  constructor() {}

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any
    seq = 0
    delays = 80
    durations = 500

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        })
      } else if (data.type === 'point') {
        seq++
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease',
          },
        })
      }
    })

    seq = 0
  }

  monthly_informations: any = [
    {
      date: '2021/01',
      income: '$ 20,000',
      expand: '$ 19.000',
      difference: '$ 1,000',
    },
    {
      date: '2021/02',
      income: '$ 20,000',
      expand: '$ 19.000',
      difference: '$ 1,000',
    },
    {
      date: '2021/03',
      income: '$ 20,000',
      expand: '$ 19.000',
      difference: '$ 1,000',
    },
    {
      date: '2021/04',
      income: '$ 20,000',
      expand: '$ 19.000',
      difference: '$ 1,000',
    },
    {
      date: '2021/05',
      income: '$ 20,000',
      expand: '$ 19.000',
      difference: '$ 1,000',
    },
    {
      date: '2021/06',
      income: '$ 20,000',
      expand: '$ 19.000',
      difference: '$ 1,000',
    },
    {
      date: '2021/07',
      income: '$ 20,000',
      expand: '$ 19.000',
      difference: '$ 1,000',
    },
    {
      date: '2021/08',
      income: '$ 20,000',
      expand: '$ 19.000',
      difference: '$ 1,000',
    },
    {
      date: '2021/09',
      income: '$ 20,000',
      expand: '$ 19.000',
      difference: '$ 1,000',
    },
    {
      date: '2021/10',
      income: '$ 20,000',
      expand: '$ 19.000',
      difference: '$ 1,000',
    },
    {
      date: '2021/11',
      income: '$ 20,000',
      expand: '$ 19.000',
      difference: '$ 1,000',
    },
    {
      date: '2021/12',
      income: '$ 20,000',
      expand: '$ 19.000',
      difference: '$ 1,000',
    },
  ]

  daily_expenditures: any = [
    { date: '10/01', expenditure: '$ 100', remain: '$ 200' },
    { date: '10/02', expenditure: '$ 100', remain: '$ 200' },
    { date: '10/03', expenditure: '$ 100', remain: '$ 200' },
    { date: '10/04', expenditure: '$ 100', remain: '$ 200' },
    { date: '10/05', expenditure: '$ 100', remain: '$ 200' },
    { date: '10/06', expenditure: '$ 100', remain: '$ 200' },
    { date: '10/07', expenditure: '$ 100', remain: '$ 200' },
    { date: '10/08', expenditure: '$ 100', remain: '$ 200' },
    { date: '10/09', expenditure: '$ 100', remain: '$ 200' },
    { date: '10/10', expenditure: '$ 100', remain: '$ 200' },
    { date: '10/11', expenditure: '$ 100', remain: '$ 200' },
    { date: '10/12', expenditure: '$ 100', remain: '$ 200' },
  ]

  ngOnInit(): void {
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    const dataDailySalesChart: any = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [[12, 17, 7, 17, 23, 18, 38]],
    }

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      // high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    var dailySalesChart = new Chartist.Line(
      '#dailySalesChart', // class
      dataDailySalesChart,
      optionsDailySalesChart,
    )

    this.startAnimationForLineChart(dailySalesChart)

    /* ----------==========  ENDOF   Daily Sales Chart initialization For Documentation    ==========---------- */

    /* ----------==========  Test    ==========---------- */
    // var testchart = new Chartist.Line('.ct-chart', {
    //   labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    //   series: [
    //     [12, 9, 7, 8, 5],
    //     [2, 1, 3.5, 7, 3],
    //     [1, 3, 4, 5, 6]
    //   ]
    // }, {
    //   fullWidth: true,
    //   chartPadding: {
    //     right: 40
    //   }
    // });

    // const me = this;
    // setTimeout(() => {
    //   me.loadChart();
    // }, 500);

    const data_testChart: any = {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      series: [
        [12, 9, 7, 8, 5],
        [2, 1, 3.5, 7, 3],
        [1, 3, 4, 5, 6],
      ],
    }

    const options_testChart: any = {
      fullWidth: true,
      chartPadding: {
        right: 40,
      },
    }

    var testChart = new Chartist.Line(
      '#testChart', // class
      data_testChart,
      options_testChart,
    )

    this.startAnimationForLineChart(testChart)

    /* ----------========== ENDOF Test    ==========---------- */
  }

  loadChart() {
    $(function () {
      var chart = new Chartist.Pie(
        '.ct-chart',
        {
          series: [100, 0],
          labels: [1, 2],
        },
        {
          donut: true,
          showLabel: false,
        },
      )

      chart.on('draw', function (data) {
        if (data.type === 'slice') {
          // Get the total path length in order to use for dash array animation
          var pathLength = data.element._node.getTotalLength()

          // Set a dasharray that matches the path length as prerequisite to animate dashoffset
          data.element.attr({
            'stroke-dasharray': pathLength + 'px ' + pathLength + 'px',
          })

          // Create animation definition while also assigning an ID to the animation for later sync usage
          var animationDefinition = {
            'stroke-dashoffset': {
              id: 'anim' + data.index,
              dur: 1000,
              from: -pathLength + 'px',
              to: '0px',
              easing: Chartist.Svg.Easing.easeOutQuint,
              // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
              fill: 'freeze',
            },
          }

          // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
          // if(data.index !== 0) {
          //   animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
          // }

          // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
          data.element.attr({
            'stroke-dashoffset': -pathLength + 'px',
          })

          // We can't use guided mode as the animations need to rely on setting begin manually
          // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
          data.element.animate(animationDefinition, false)
        }
      })

      // For the sake of the example we update the chart every time it's created with a delay of 8 seconds
    })
  }
}
