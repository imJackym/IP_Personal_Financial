import { ApiService } from "./../../services/api.service"
import { IecategoryComponent } from "./dialog/iecategory/iecategory.component"
import { EiecategoryComponent } from "./dialog/eiecategory/eiecategory.component"

import { Component, OnInit, ViewChild } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"

import { MatPaginator } from "@angular/material/paginator"
import { MatSort } from "@angular/material/sort"
import { MatTableDataSource } from "@angular/material/table"
import { element } from "protractor"

import * as Chartist from "chartist"

@Component({
  selector: "app-ieplan",
  templateUrl: "./ieplan.component.html",
  styleUrls: ["./ieplan.component.css"],
})
export class IeplanComponent implements OnInit {
  constructor(public dialog: MatDialog, private api: ApiService) {}
  iCategorys = []
  eCategorys = []
  SAmount = []

  // select box
  years = []
  months = []
  
  ngOnInit(): void {
    this.getSelectOption()
    this.getiCategory()
    this.geteCategory()
    this.getSummaryAmount()
    this.graph()
  }

  getSelectOption() {
    this.api.getIncomeRecord().subscribe({
      next: res => {
        res.forEach(element => {
          this.years.push(element.year)
          this.months.push(element.month)
        });
        this.api.getExpenditureRecord().subscribe({
          next: res => {
            res.forEach(element => {
              this.years.push(element.year)
              this.months.push(element.month)
            });
            this.years.sort(function(a, b){return b-a})
            this.years = this.years.filter((element, index) => {
              return this.years.indexOf(element) === index
            })
            this.months.sort()
            this.months = this.months.filter((element, index) => {
              return this.months.indexOf(element) === index
            })
          },
          error() {},
        })
      },
      error() {},
    })
  }

  getiCategory() {
    this.api.getIncomeCategory().subscribe({
      next: res => {
        res.forEach(element => {
          let totalAmount = 0
          element.amount = totalAmount
          this.api.getIncomeRecord_category(element.id).subscribe({
            next: res => {
              if (res.length > 0) {
                res.forEach(element => {
                  totalAmount += parseInt(element.amount)
                })
              }
              element.amount = totalAmount
            },
            error() {
              alert("Record err")
            },
          })
        })
        this.iCategorys = res
      },
      error() {
        alert("Record err")
      },
    })
  }
  geteCategory() {
    console.log(`--- geteCategory`)
    this.api.getExpenditureCategory().subscribe({
      next: res => {
        res.forEach(element => {
          console.log(`res---`)
          console.log(res)
          let totalAmount = 0
          element.amount = totalAmount
          this.api.getExpenditureRecord_category(element.id).subscribe({
            next: res => {
              console.log(`---res---`)
              console.log(res)
              if (res.length > 0) {
                res.forEach(element => {
                  totalAmount += parseInt(element.amount)
                })
              }
              element.amount = totalAmount
            },
            error() {
              alert("Record err")
            },
          })
        })
        this.eCategorys = res
      },
      error() {
        alert("Record err")
      },
    })
  }
  getSummaryAmount() {
    let iexpectAmount = 0
    this.api.getIncomeCategory().subscribe({
      next: res => {
        if (res.length > 0) {
          res.forEach((element: any) => {
            iexpectAmount += parseInt(element.expected_amount ? element.expected_amount : "0")
          })
        }
        this.pushAmount("iexpectAmount", iexpectAmount)
      },
      error() {
        alert("Record err")
      },
    })
    let eexpectAmount = 0
    this.api.getExpenditureCategory().subscribe({
      next: res => {
        if (res.length > 0) {
          res.forEach((element: any) => {
            eexpectAmount += parseInt(element.expected_amount ? element.expected_amount : "0")
          })
        }
        this.pushAmount("eexpectAmount", eexpectAmount)
      },
      error() {
        alert("Record err")
      },
    })
    let eAmount: number = 0
    this.api.getExpenditureRecord().subscribe({
      next: async res => {
        if (res.length > 0) {
          await res.forEach((element: any) => {
            eAmount += parseInt(element.amount ? element.amount : "0")
          })
        }
        this.pushAmount("eAmount", eAmount)
      },
      error() {
        alert("Record err")
      },
    })
    let iAmount: number = 0
    this.api.getIncomeRecord().subscribe({
      next: async res => {
        if (res.length > 0) {
          await res.forEach((element: any) => {
            iAmount += parseInt(element.amount ? element.amount : "0")
          })
        }
        this.pushAmount("iAmount", iAmount)
      },
      error() {
        alert("Record err")
      },
    })
  }

  editCategory(row: any) {
    if (row.pi) {
      this.dialog
        .open(IecategoryComponent, {
          width: "100%",
          data: row,
        })
        .afterClosed()
        .subscribe(val => {
          if (val === "update") {
            this.getiCategory()
            this.geteCategory()
            this.getSummaryAmount()
          }
        })
    }
    if (row.fe) {
      this.dialog
        .open(EiecategoryComponent, {
          width: "100%",
          data: row,
        })
        .afterClosed()
        .subscribe(val => {
          if (val === "update") {
            this.getiCategory()
            this.geteCategory()
            this.getSummaryAmount()
          }
        })
    }
  }

  pushAmount(name: string, num: number) {
    this.SAmount[name] = num
  }

  /* ----------==========     lineChartIncome initialization    ==========---------- */
  graph() {
    const data_lineChartIncome: any = {
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      series: [
        [23, 50, 60, 10, 41],
        [41, 35, 22, 48, 36],
      ],
    }

    const options_lineChartIncome: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      axisX: {
        showGrid: true,
        position: "end",
        showLabel: true,
      },
      low: 0,
      height: 300,
      high: 200,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
      classNames: {
        label: "ct-label-line",
        labelGroup: "ct-labels-line",
      },
    }

    var lineChartIncome = new Chartist.Line("#lineChartIncome", data_lineChartIncome, options_lineChartIncome)
    this.startAnimationForLineChart(lineChartIncome)
  }
  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any
    seq = 0
    delays = 80
    durations = 500
    chart.on("draw", function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        })
      } else if (data.type === "point") {
        seq++
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease",
          },
        })
      }
    })
    seq = 0
  }
}
