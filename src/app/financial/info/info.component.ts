import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.plot_graph()
  }
  total_asset = 10000000


  plot_graph() {
    let year = new Date().getFullYear()-1
    let year_x = []
    let year_y_thm = []
    for (let y = 1; y < 27; y++) {
      year_x[y - 1] = y + "y"
    }

    for (let y = 0; y < 25; y++) {
      year_y_thm[y] = this.total_asset - this.total_asset * 0.04 * y
    }

    var planA_thm_data = {
      labels: year_x,
      series: [year_y_thm],
    }
    var optionsChart = {
      axisX: {
        showGrid: false,
      },
      high: this.total_asset,
      height: 400,
      chartPadding: { top: 10, right: 20, bottom: 0, left: 20 },
    }
    var planA_thm = new Chartist.Bar("#planA_thm", planA_thm_data, optionsChart, [])

    this.startAnimationForBarChart(planA_thm)
  }

  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any
    seq2 = 0
    delays2 = 80
    durations2 = 500
    chart.on("draw", function (data) {
      if (data.type === "bar") {
        seq2++
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        })
      }
    })
    seq2 = 0
  }

}
