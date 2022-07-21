import { ApiService } from "./../../services/api.service"
import { IecategoryComponent } from "./dialog/iecategory/iecategory.component"
import { EiecategoryComponent } from "./dialog/eiecategory/eiecategory.component"
import { ReportComponent } from "./dialog/report/report.component"

import { Component, OnInit, ViewChild } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"

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
  y_axis_backup = []

  // FT
  incList = []
  expList = []

  port = "a"

  ngOnInit(): void {
    this.iCategorys = []
    this.eCategorys = []
    this.x_axis = []
    this.y_axis = []
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
        if (this.port == "a" || this.port == "i") {
          this.api.getIncomeRecord_ync1("year", year).subscribe({
            next: res => {
              this.set_y_axis(res)
            },
            error() {
              alert("Record err")
            },
          })
        }
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
        if (this.port == "a" || this.port == "e") {
          this.api.getExpenditureRecord_ync1("year", year).subscribe({
            next: res => {
              this.set_y_axis(res)
              this.graph()
            },
            error() {
              alert("Record err")
            },
          })
        } else {
          this.graph()
        }
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
  openAnalyseReport() {
    this.dialog
      .open(ReportComponent, {
        width: "200%",
        maxHeight: "55vw",
      })
      .afterClosed()

  }

  onChangeSelet(type: any, value: any) {
    console.log(`--- onChangeSelet`)
    this.port = "a"

    if (type === "year") {
      this.yearSelectedValue = value
      if (value != null && this.monthSelectedValue != null) {
        this.select_TT(value, this.monthSelectedValue)
      } else if (value != null && this.monthSelectedValue == null) {
        this.select_TF(value, this.monthSelectedValue)
      } else if (value == null && this.monthSelectedValue != null) {
        this.select_FT(value, this.monthSelectedValue)
      } else if (value == null && this.monthSelectedValue == null) {
        //   this.select_FF(value, this.monthSelectedValue)
        this.ngOnInit()
      }
    } else if (type === "month") {
      this.monthSelectedValue = value
      if (this.yearSelectedValue != null && value != null) {
        this.select_TT(this.yearSelectedValue, value)
      } else if (this.yearSelectedValue != null && value == null) {
        this.select_TF(this.yearSelectedValue, value)
      } else if (this.yearSelectedValue == null && value != null) {
        this.select_FT(this.yearSelectedValue, value)
      } else if (this.yearSelectedValue == null && value == null) {
        //   this.select_FF(this.yearSelectedValue, value)
        this.ngOnInit()
      }
    }
  }

  select_TT(yearV: any, monthV: any) {
    console.log(`--- select_TT`)
    this.x_axis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    this.y_axis = []
    this.iCategorys = []
    this.eCategorys = []
    let y_axis_income = []
    let y_axis_exp = []
    this.x_axis.forEach(e => {
      y_axis_income.push(0)
      y_axis_exp.push(0)
    })
    console.log(`this.port ${this.port}`)

    this.api.getIncomeCategory().subscribe({
      next: res => {
        res.forEach((element, key1, arr1) => {
          element.expected_amount = parseInt(element.expected_amount) * 12
          let monthly_amount_perCategory = 0
          this.api.getIncomeRecord_ync3(yearV, monthV, element.id).subscribe({
            next: res => {
              this.x_axis.forEach((d, i) => {
                let filterSum = 0
                let filterResult = res.filter(res_filter => parseInt(res_filter.day) == d)
                if (filterResult.length > 0) {
                  filterResult.forEach(element => {
                    filterSum += parseInt(element.amount)
                    monthly_amount_perCategory += parseInt(element.amount)
                  })
                  y_axis_income[i] += filterSum
                }
              })
              element.amount = monthly_amount_perCategory
              if (Object.is(arr1.length - 1, key1)) {
                this.graph()
              }
            },
            error() {},
          })
        })
        this.iCategorys = res
        if (this.port == "a" || this.port == "i") {
          this.y_axis.push(y_axis_income)
        }
      },
      error() {},
    })
    this.api.getExpenditureCategory().subscribe({
      next: res => {
        res.forEach((element, key2, arr2) => {
          element.expected_amount = parseInt(element.expected_amount) * 12
          let monthly_amount_perCategory = 0
          this.api.getExpenditureRecord_ync3(yearV, monthV, element.id).subscribe({
            next: res => {
              this.x_axis.forEach((d, i) => {
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
              if (Object.is(arr2.length - 1, key2)) {
                this.graph()
              }
            },
          })
        })
        this.eCategorys = res
        if (this.port == "a" || this.port == "e") {
          this.y_axis.push(y_axis_exp)
        }
      },
      error() {},
    })
  }
  select_TF(yearV: any, monthV: any) {
    console.log(`--- select_TF`)
    console.log(`this.port ${this.port}`)

    this.x_axis = []
    for (let m = 1; m < 13; m++) {
      this.x_axis.push(`${yearV}/${m}`)
    }
    let dummyX = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    this.y_axis = []
    let y_axis_income = []
    let y_axis_exp = []

    this.x_axis.forEach(e => {
      y_axis_income.push(0)
      y_axis_exp.push(0)
    })

    this.iCategorys = []
    this.eCategorys = []

    // -------------------------------------------------------------------------
    this.api.getIncomeCategory().subscribe({
      next: res => {
        res.forEach((element, key1, arr1) => {
          element.expected_amount = parseInt(element.expected_amount) * 12
          let table_amount = 0
          this.api.getIncomeRecord_ync2("year", yearV, "category_id", element.id).subscribe({
            next: res => {
              res.forEach(element => {
                table_amount += parseInt(element.amount)
              })
              dummyX.forEach((m, i) => {
                let filterSum = 0
                let filterResult = res.filter(res_filter => res_filter.month == m)
                if (filterResult.length > 0) {
                  filterResult.forEach(element => {
                    filterSum += parseInt(element.amount)
                  })
                  y_axis_income[i] += filterSum
                }
              })
              element.amount = table_amount
              if (Object.is(arr1.length - 1, key1)) {
                this.graph()
              }
            },
          })
        })
        this.iCategorys = res
        if (this.port == "a" || this.port == "i") {
          this.y_axis.push(y_axis_income)
        }
      },
    })
    // -------------------------------------------------------------------------
    this.api.getExpenditureCategory().subscribe({
      next: res => {
        res.forEach((element, key2, arr2) => {
          element.expected_amount = parseInt(element.expected_amount) * 12
          let table_amount = 0
          this.api.getExpenditureRecord_ync2("year", yearV, "category_id", element.id).subscribe({
            next: res => {
              res.forEach(element => {
                table_amount += parseInt(element.amount)
              })
              dummyX.forEach((m, i) => {
                let filterSum = 0
                let filterResult = res.filter(res_filter => res_filter.month == m)
                if (filterResult.length > 0) {
                  filterResult.forEach(element => {
                    filterSum += parseInt(element.amount)
                  })
                  y_axis_exp[i] += filterSum
                }
              })
              element.amount = table_amount
              if (Object.is(arr2.length - 1, key2)) {
                this.graph()
              }
            },
          })
        })
        this.eCategorys = res
        if (this.port == "a" || this.port == "e") {
          this.y_axis.push(y_axis_exp)
        }
      },
    })
  }
  select_FT(yearV: any, monthV: any) {
    console.log(`--- select_FT`)
    console.log(`this.port ${this.port}`)
    this.iCategorys = []
    this.eCategorys = []
    this.x_axis = []
    this.y_axis = []
    this.incList = []
    this.expList = []
    // TODO - show maximum
    // for table
    this.api.getIncomeCategory().subscribe({
      next: res => {
        res.forEach((element, key1, arr1) => {
          element.expected_amount = parseInt(element.expected_amount)
          let table_amount = 0
          this.api.getIncomeRecord_ync2("month", monthV, "category_id", element.id).subscribe({
            next: res => {
              res.forEach(element => {
                table_amount += parseInt(element.amount)
              })
              element.amount = table_amount
              if (Object.keys(res).length != 0) {
                this.incList.push(res)
              }
              if (Object.is(arr1.length - 1, key1)) {
                this.graph("FT")
              }
            },
          })
        })
        this.iCategorys = res
      },
    })
    // -------------------------------------------------------------------------------
    this.api.getExpenditureCategory().subscribe({
      next: res => {
        res.forEach((element, key2, arr2) => {
          element.expected_amount = parseInt(element.expected_amount)
          let table_amount = 0
          this.api.getExpenditureRecord_ync2("month", monthV, "category_id", element.id).subscribe({
            next: res => {
              res.forEach(element => {
                table_amount += parseInt(element.amount)
              })
              element.amount = table_amount
              if (Object.keys(res).length != 0) {
                this.expList.push(res)
              }
              if (Object.is(arr2.length - 1, key2)) {
                this.graph("FT")
              }
            },
          })
        })
        this.eCategorys = res
      },
    })
  }
  // select_FF(yearV: any, monthV: any) {
  //   console.log(`--- select_FF`)
  // }

  set_x_axis_FT() {
    console.log(`set_x_axis_FT`)
    this.x_axis = []
    this.y_axis = []
    let x_axis_dummy = []
    let y_axis_dummy_i = []
    let y_axis_dummy_e = []
    let y_axis_income = []
    let y_axis_exp = []

    this.incList.forEach(element => {
      element.forEach(element => {
        x_axis_dummy.push(`${element.year}/${parseInt(element.month)}`)
        y_axis_dummy_i.push(element)
      })
    })
    this.expList.forEach(element => {
      element.forEach(element => {
        x_axis_dummy.push(`${element.year}/${parseInt(element.month)}`)
        y_axis_dummy_e.push(element)
      })
    })

    x_axis_dummy.sort()
    this.x_axis = x_axis_dummy.filter((element, index) => {
      return x_axis_dummy.indexOf(element) === index
    })

    if (this.port == "a" || this.port == "i") {
      this.x_axis.forEach((y, i) => {
        y_axis_income[i] = 0
        let filterSum = 0
        let filterResult = y_axis_dummy_i.filter(res_filter => res_filter.year == y.split("/")[0])
        if (filterResult.length > 0) {
          filterResult.forEach(element => {
            filterSum += parseInt(element.amount)
          })
          y_axis_income[i] += filterSum
        }
      })
      this.y_axis.push(y_axis_income)
    }
    if (this.port == "a" || this.port == "e") {
      this.x_axis.forEach((y, i) => {
        y_axis_exp[i] = 0
        let filterSum = 0
        let filterResult = y_axis_dummy_e.filter(res_filter => res_filter.year == y.split("/")[0])
        if (filterResult.length > 0) {
          filterResult.forEach(element => {
            filterSum += parseInt(element.amount)
          })
          y_axis_exp[i] += filterSum
        }
      })
      this.y_axis.push(y_axis_exp)
    }
  }
  changeGraph(v: any, y: any, m: any) {
    console.log(`--- changeGraph`)
    console.log(v)
    console.log(y)
    console.log(m)
    console.log(this.y_axis_backup)
    if (v == "") {
      this.port = "a"
    } else if (v == "i") {
      this.port = "i"
    } else if (v == "e") {
      this.port = "e"
    }
    if (typeof y !== "undefined" && typeof m !== "undefined") {
      this.select_TT(y, m)
    } else if (typeof y !== "undefined" && typeof m === "undefined") {
      this.select_TF(y, m)
    } else if (typeof y === "undefined" && typeof m !== "undefined") {
      this.select_FT(y, m)
    } else if (typeof y === "undefined" && typeof m === "undefined") {
      this.ngOnInit()
    }
  }

  /* ----------==========     lineChartIncome initialization    ==========---------- */
  graph(v: any = null) {
    console.log(`--- graph`)

    if (v == "FT") {
      this.set_x_axis_FT()
    }

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
