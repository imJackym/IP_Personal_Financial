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
import { MatSelect, MatSelectChange } from "@angular/material/select"

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

  // data prepare
  // iCategoryList = [] // id, category
  // eCategoryList = []

  // select box
  years = []
  yearSelectedValue: any
  months = []
  monthSelectedValue: any

  // graph
  x_axis = []
  y_axis = []

  ngOnInit(): void {
    this.set_x_axis()
    this.getSelectOption()
    this.getiCategory()
    this.getSummaryAmount()
  }

  set_x_axis() {
    let year = new Date().getFullYear()
    for (let m = 1; m < 13; m++) {
      this.x_axis.push(`${year}/${m}`)
    }
  }
  set_y_axis(res: any) {
    console.log(`--- set_Yaxis`)
    console.log(res)
    let filterAmount = []
    for (let d = 1; d < 13; d++) {
      let filterSum = 0
      let filterResult = res.filter(res_filter => parseInt(res_filter.month) == d)
      if (filterResult.length < 0) {
        filterAmount.push(0)
      } else {
        filterResult.forEach(element => {
          filterSum += parseInt(element.amount)
        })
        filterAmount.push(filterSum)
      }
    }
    this.y_axis.push(filterAmount)
    console.log(this.y_axis)
  }
  getSelectOption() {
    this.api.getIncomeRecord().subscribe({
      next: res => {
        res.forEach(element => {
          this.years.push(element.year)
          this.months.push(element.month)
        })
        this.api.getExpenditureRecord().subscribe({
          next: res => {
            res.forEach(element => {
              this.years.push(element.year)
              this.months.push(element.month)
            })
            this.years.sort(function (a, b) {
              return b - a
            })
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
    console.log(`--- getiCategory`)
    let year = new Date().getFullYear()
    let iCat_DailyAmount = []
    this.api.getIncomeCategory().subscribe({
      next: res => {
        res.forEach(element => {
          let totalAmount = 0
          element.amount = totalAmount
          this.api.getIncomeRecord_ync2("year", year, "category_id", element.id).subscribe({
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
        this.api.getIncomeRecord_ync1("year", year).subscribe({
          next: res => {
            this.set_y_axis(res)
          },
          error() {
            alert("Record err")
          },
        })
        this.geteCategory()
      },
      error() {
        alert("Record err")
      },
    })
  }
  geteCategory() {
    console.log(`--- geteCategory`)
    let year = new Date().getFullYear()
    this.api.getExpenditureCategory().subscribe({
      next: res => {
        res.forEach(element => {
          let totalAmount = 0
          element.amount = totalAmount
          this.api.getExpenditureRecord_ync2("year", year, "category_id", element.id).subscribe({
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
        this.eCategorys = res
        this.api.getExpenditureRecord_ync1("year", year).subscribe({
          next: res => {
            this.set_y_axis(res)
            this.graph()
          },
          error() {
            alert("Record err")
          },
        })
      },
      error() {
        alert("Record err")
      },
    })
  }
  getSummaryAmount = () => {
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
  pushAmount(name: string, num: number) {
    this.SAmount[name] = num
  }

  // button function
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

  onChangeSelet(type: any, value: any, event: MatSelectChange) {
    // const matSelect: MatSelect = event.source
    // matSelect.writeValue(null)

    console.log(`--- onChangeSelet`)
    console.log(type)
    console.log(value)

    let iCategoryList_id = []

    if (type === "year") {
      this.yearSelectedValue = value
      if (value != null && this.monthSelectedValue != null) {
        this.select_TT(value, this.monthSelectedValue)
      } else if (value != null && this.monthSelectedValue == null) {
        this.select_TF()
      } else if (value == null && this.monthSelectedValue != null) {
        this.select_FT()
      } else if (value == null && this.monthSelectedValue == null) {
        this.select_FF()
      }
    } else if (type === "month") {
      this.monthSelectedValue = value
      if (this.yearSelectedValue != null && value != null) {
        // this.select_TT()
      } else if (this.yearSelectedValue != null && value == null) {
        this.select_TF()
      } else if (this.yearSelectedValue == null && value != null) {
        this.select_FT()
      } else if (this.yearSelectedValue == null && value == null) {
        this.select_FF()
      }
    }
  }
  select_TT(yearV: any, monthV: any) {
    console.log(`--- select_TT`)
    this.x_axis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    let y_axis_date = []
    this.iCategorys = []
    this.eCategorys = []
    let y_axis_income = []
    let y_axis_exp = []
    this.x_axis.forEach(e => {
      y_axis_income.push(0)
      y_axis_exp.push(0)
    })

    this.api.getIncomeCategory().subscribe({
      next: res => {
        res.forEach(element => {
          element.expected_amount = parseInt(element.expected_amount) * 12
          let monthly_amount_perCategory = 0
          this.api.getIncomeRecord_ync3(yearV, monthV, element.id).subscribe({
            next: res => {
              this.x_axis.forEach((d,i) => {
                let filterSum = 0
                let filterResult = res.filter(res_filter => parseInt(res_filter.day) == d)
                if (filterResult.length < 0) {
                } else {
                  filterResult.forEach(element => {
                    filterSum += parseInt(element.amount)
                    monthly_amount_perCategory += parseInt(element.amount)
                  })
                  y_axis_income[i] = y_axis_income[i] + filterSum
                }
              })
              element.amount = monthly_amount_perCategory
            },
          })
        })
        y_axis_date.push(y_axis_income)
        this.iCategorys = res
      },
      error() {},
    })

    this.api.getExpenditureCategory().subscribe({
      next: res => {
        res.forEach(element => {
          element.expected_amount = parseInt(element.expected_amount) * 12
          let monthly_amount_perCategory = 0
          this.api.getIncomeRecord_ync3(yearV, monthV, element.id).subscribe({
            next: res => {
              this.x_axis.forEach((d,i) => {
                let filterSum = 0
                let filterResult = res.filter(res_filter => parseInt(res_filter.day) == d)
                if (filterResult.length < 0) {
                } else {
                  filterResult.forEach(element => {
                    filterSum += parseInt(element.amount)
                    monthly_amount_perCategory += parseInt(element.amount)
                  })
                  y_axis_exp[i] = y_axis_exp[i] + filterSum
                }
              })
              element.amount = monthly_amount_perCategory
            },
          })
        })
        y_axis_date.push(y_axis_exp)
        this.eCategorys = res
      },
      error() {},
    })







    // this.eCategorys = []
    // this.x_axis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    // this.y_axis = []
    // let eCat_DailyAmount = []
    // this.api.getExpenditureRecord_ync2("year", yearV, "month", monthV).subscribe({
    //   next: res => {
    //     let monthly_amount = 0 // for table total amount
    //     res.forEach(res_element => {
    //       monthly_amount += parseInt(res_element.amount) // for table total amount
    //     })

    //     this.x_axis.forEach(d => {
    //       let filterSum = 0
    //       let filterResult = res.filter(res_filter => parseInt(res_filter.day) == d)
    //       if (filterResult.length < 0) {
    //         eCat_DailyAmount.push(0)
    //       } else {
    //         filterResult.forEach(element => {
    //           filterSum += parseInt(element.amount)
    //         })
    //         eCat_DailyAmount.push(filterSum)
    //       }
    //     })
    //     this.y_axis.push(eCat_DailyAmount)
    //     this.graph()
    //   },
    //   error() {},
    // })
  }
  select_TF() {
    console.log(`--- select_TF`)
  }
  select_FT() {
    console.log(`--- select_FT`)
  }
  select_FF() {
    console.log(`--- select_FF`)
  }

  /* ----------==========     lineChartIncome initialization    ==========---------- */
  graph() {
    console.log(`--- graph`)
    const data_lineChartIncome: any = {
      labels: this.x_axis,
      series: this.y_axis,
    }

    let maxHigh = () => {
      let max_high = 0
      this.y_axis.forEach(element => {
        element.forEach(e => {
          if (max_high < e) max_high += e + 100
        })
      })
      return max_high
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
      height: 400,
      high: maxHigh,
      chartPadding: { top: 10, right: 0, bottom: 0, left: 0 },
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
