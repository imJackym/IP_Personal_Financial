import { ApiService } from "./../../services/api.service"
import { ErecordComponent } from "./dialog/erecord/erecord.component"
import { EcategoryComponent } from "./dialog/ecategory/ecategory.component"

import { Component, OnInit, ViewChild } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"
declare var $: any
import * as Chartist from "chartist"

@Component({
  selector: "app-expenditure",
  templateUrl: "./expenditure.component.html",
  styleUrls: ["./expenditure.component.scss"],
})
export class ExpenditureComponent implements OnInit {
  constructor(public dialog: MatDialog, private api: ApiService) {}

  showDiv = {
    alert: true,
    a_more: true,
    a_less: false,
  }

  exHistorys = []
  view_exHistorys = []
  exCategorys = []
  view_exCategorys = []
  new_exCategorys_list = []
  old_exCategorys_list = []

  r_date = 0
  r_cate = 0
  r_amot = 0
  c_cate = 0
  c_amot = 0

  selectedAmount = 0
  maxAmount = 0
  monthly = 0
  yearly = 0
  totalIncome = 0
  selectedYear = 0
  selectedMonth = 0
  isResult = []
  years = []
  categorys = []
  months = [
    { show: "1", value: "01" },
    { show: "2", value: "02" },
    { show: "3", value: "03" },
    { show: "4", value: "04" },
    { show: "5", value: "05" },
    { show: "6", value: "06" },
    { show: "7", value: "07" },
    { show: "8", value: "08" },
    { show: "9", value: "09" },
    { show: "10", value: "10" },
    { show: "11", value: "11" },
    { show: "12", value: "12" },
  ]
  yearV = null
  monthV = null
  categoryV = null
  oninit

  ngOnInit(): void {
    this.onload()
    this.oninit = "T"
  }

  // Record
  addRecord() {
    this.dialog
      .open(ErecordComponent, { width: "100%" })
      .afterClosed()
      .subscribe(val => {
        if (val === "save") {
          this.onload()
        }
      })
  }
  editRecord(exHistory: any) {
    this.dialog
      .open(ErecordComponent, { width: "100%", data: exHistory })
      .afterClosed()
      .subscribe(val => {
        if (val === "update") {
          this.onload()
        }
      })
  }
  deleteRecord(id: number) {
    // console.log(id)
    this.api.deleteExpenditureRecord(id).subscribe({
      next: res => {
        alert(`Record delete`)
        this.onload()
      },
      error() {
        alert("Record err")
      },
    })
  }

  // Category
  addCategory() {
    console.log(`addCategory`)
    this.dialog
      .open(EcategoryComponent, { width: "100%" })
      .afterClosed()
      .subscribe(val => {
        if (val === "save") {
          this.onload()
        }
      })
  }
  editCategory(exCategory: any) {
    this.dialog
      .open(EcategoryComponent, { width: "100%", data: exCategory })
      .afterClosed()
      .subscribe(val => {
        if (val === "update") {
          this.onload()
        }
      })
  }

  // Button function
  onChangeSelet(attr: any, value: any) {
    console.log(`onChangeSelet + ${value}`)
    if (attr == "year") {
      this.yearV = value
    }
    if (attr == "month") {
      this.monthV = value
    }
    if (attr == "category_id") {
      this.categoryV = value
    }
  }
  search() {
    console.log(`search`)
    this.selectedAmount = 0
    this.monthly = 0
    this.yearly = 0
    if (this.yearV != null) {
      if (this.monthV != null && this.categoryV != null) {
        this.api_ymc3("year", this.yearV, "month", this.monthV, "category_id", this.categoryV)
      } else if (this.monthV != null) {
        this.api_ymc2("year", this.yearV, "month", this.monthV)
      } else if (this.categoryV != null) {
        this.api_ymc2("year", this.yearV, "category_id", this.categoryV)
      } else {
        this.api_ymc1("year", this.yearV)
      }
    } else if (this.monthV != null) {
      if (this.categoryV != null) {
        this.api_ymc2("month", this.monthV, "category_id", this.categoryV)
      } else {
        this.api_ymc1("month", this.monthV)
      }
    } else if (this.categoryV != null && this.monthV == null && this.yearV == null) {
      this.api_ymc1("category_id", this.categoryV)
    } else {
      this.showNotification("Please select at least one of selection")
    }
  }
  refresh() {
    window.location.reload()
  }

  // ngOnInit()
  onload() {
    this.getCategory()
  }
  getCategory() {
    this.api.getExpenditureCategory().subscribe({
      next: async res => {
        this.exCategorys = res
        this.getExpenditure()
      },
      error() {
        alert("Record err")
      },
    })
  }
  getExpenditure() {
    this.api.getExpenditureRecord().subscribe({
      next: res => {
        res.forEach(element => {
          this.exCategorys.forEach(e => {
            if (e.id == element.category_id) {
              element["category"] = e.category
            }
          })
        })
        this.exHistorys = res
        this.old_exCategorys_list = this.exCategorys
        this.setSelectYear()
        this.setChart()
      },
      error() {
        alert("Record err")
      },
    })
  }
  // extend
  api_ymc1(attr1: any, v1: any) {
    console.log("--- api_ymc1")
    if(attr1=='year') this.oninit = "N"
    let new_exCategorys_id = null
    let s = "showAll"
    if (v1 == s) {
      this.onload()
    } else {
      this.api.getExpenditureRecord_ync1(attr1, v1).subscribe({
        next: res => {
          res.forEach(element => {
            this.exCategorys.forEach(c => {
              if (c.id == element.category_id) {
                element["category"] = c.category
                new_exCategorys_id = c.id
              }
            })
          })
          this.exHistorys = res
          if (attr1 == "category_id") {
            this.getSelectedCategoryList(new_exCategorys_id)
          }
          console.log(`getIncomeRecord_ync1`)
          console.log(res)
          this.getSelectedTotalAmount(res)
          this.setChart()
        },
        error() {
          alert("Record err")
        },
      })
    }
  }
  api_ymc2(attr1: any, v1: any, attr2: any, v2: any) {
    console.log("--- api_ymc2")
    if(attr1=='year') this.oninit = "N"
    let new_exCategorys_id = null
    let s = "showAll"
    if (v1 == s && v2 == s) {
      this.onload()
    } else if (v1 == s || v2 == s) {
      if (v1 == s) {
        this.api_ymc1(attr2, v2)
      } else {
        this.api_ymc1(attr1, v1)
      }
    } else {
      this.api.getExpenditureRecord_ync2(attr1, v1, attr2, v2).subscribe({
        next: res => {
          res.forEach(element => {
            this.exCategorys.forEach(c => {
              if (c.id == element.category_id) {
                element["category"] = c.category
                new_exCategorys_id = c.id
              }
            })
          })
          if (attr1 == "category_id" || attr2 == "category_id") {
            this.getSelectedCategoryList(new_exCategorys_id)
          }
          this.exHistorys = res
          this.getSelectedTotalAmount(res)
          this.setChart()
        },
        error() {
          alert("Record err")
        },
      })
    }
  }
  api_ymc3(attr1: any, v1: any, attr2: any, v2: any, attr3: any, v3: any) {
    console.log("--- api_ymc3")
    if(attr1=='year') this.oninit = "N"
    let new_exCategorys_id = null
    let s = "showAll"
    if (v1 == s && v2 == s && v3 == s) {
      this.onload()
    } else if (v1 == s && v2 == s) {
      this.api_ymc1(attr3, v3)
    } else if (v1 == s && v3 == s) {
      this.api_ymc1(attr2, v2)
    } else if (v2 == s && v3 == s) {
      this.api_ymc1(attr1, v1)
    } else if (v1 == s) {
      this.api_ymc2(attr2, v2, attr3, v3)
    } else if (v2 == s) {
      this.api_ymc2(attr1, v1, attr3, v3)
    } else if (v3 == s) {
      this.api_ymc2(attr1, v1, attr2, v2)
    } else {
      this.api.getExpenditureRecord_ync3(v1, v2, v3).subscribe({
        next: res => {
          res.forEach(element => {
            this.exCategorys.forEach(c => {
              if (c.id == element.category_id) {
                element["category"] = c.category
                new_exCategorys_id = c.id
              }
            })
          })
          this.exHistorys = res
          this.getSelectedCategoryList(new_exCategorys_id)
          if (attr1 == "year") {
            this.getSelectedYearAmount(res, attr1, v1)
          }
          if (attr2 == "month") {
            this.getSelectedMonthAmount(res, attr1, v1, attr2, v2)
          }
          this.getSelectedTotalAmount(res)
          this.setChart()
        },
        error() {
          alert("Record err")
        },
      })
    }
  }
  getSelectedCategoryList(new_exCategorys_id: any) {
    console.log(`--- getSelectedCategoryList`)
    this.new_exCategorys_list = []
    this.exCategorys.forEach(c => {
      if (c.id == new_exCategorys_id) {
        this.new_exCategorys_list.push(c)
      }
    })
    // this.old_exCategorys_list = this.exCategorys;
    this.exCategorys = this.new_exCategorys_list
  }
  // selected year total
  getSelectedYearAmount(res: any, attr1: any, v1: any) {
    this.selectedYear = 0
    this.api.getExpenditureRecord_ync1(attr1, v1).subscribe({
      next: res => {
        res.forEach(element => {
          this.selectedYear += parseInt(element.amount)
        })
        console.log(`selectedYear/${this.selectedYear}`)
      },
      error() {},
    })
  }
  // selected month total
  getSelectedMonthAmount(res: any, attr1: any, v1: any, attr2: any, v2: any) {
    this.selectedMonth = 0
    this.api.getExpenditureRecord_ync2(attr1, v1, attr2, v2).subscribe({
      next: res => {
        res.forEach(element => {
          this.selectedMonth += parseInt(element.amount)
        })
      },
      error() {},
    })
  }
  // selected total
  getSelectedTotalAmount(res: any) {
    console.log(`--- getSelectedTotalAmount`)
    console.log(res)
    res.forEach((element: any) => {
      this.selectedAmount += parseInt(element.amount)
    })
  }
  setSelectYear() {
    console.log(`--- setSelectYear`)
    let yearSort = []
    this.exHistorys.forEach(element => {
      yearSort.push(element.year)
    })
    yearSort.sort((a, b) => (a > b ? -1 : 0))
    this.years = yearSort.filter((element, index) => {
      return yearSort.indexOf(element) === index
    })
  }
  showNotification(message: any, from: any = "top", align: any = "right") {
    $.notify(
      {
        icon: "notifications",
        message: message,
      },
      {
        type: "danger",
        timer: 4000,
        placement: {
          from: from,
          align: align,
        },
        template:
          '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss"><i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i>' +
          '<span data-notify="title">{1}</span>' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          "</div>" +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          "</div>",
      }
    )
  }
  sort(sortType: any = null, listType: any = null) {
    console.log(`--- sort`)
    // console.log(sortType)
    // console.log(listType)
    // console.log(`-----------------------`)
    this.view_exCategorys = this.exCategorys
    this.view_exHistorys = this.exHistorys
    // console.log(`-----------------------`)
    // record => date / category / amount
    // category => category / amount
    let as_ds = 0
    if (sortType == "date" && listType == "record") {
      this.r_date = this.r_date + 1
      as_ds = this.r_date % 2
      this.view_exHistorys = this.sorting_date(this.view_exHistorys, as_ds)
    } else if (sortType == "category" && listType == "record") {
      this.r_cate = this.r_cate + 1
      as_ds = this.r_cate % 2
      this.view_exHistorys = this.sorting_category(this.view_exHistorys, as_ds)
    } else if (sortType == "amount" && listType == "record") {
      this.r_amot = this.r_amot + 1
      as_ds = this.r_amot % 2
      this.view_exHistorys = this.sorting_amount(this.view_exHistorys, as_ds)
    } else if (sortType == "category" && listType == "category") {
      this.c_cate = this.c_cate + 1
      as_ds = this.c_cate % 2
      this.view_exCategorys = this.sorting_category(this.view_exCategorys, as_ds)
    } else if (sortType == "amount" && listType == "category") {
      this.c_amot = this.c_amot + 1
      as_ds = this.c_amot % 2
      this.view_exCategorys = this.sorting_amount(this.view_exCategorys, as_ds)
    }
    // console.log(this.view_exHistorys)
    // console.log(this.view_exCategorys)
  }
  sorting_date(sortList: any, as_ds: any) {
    return sortList.sort(function (a, b) {
      var keyA = new Date(a.date),
        keyB = new Date(b.date)
      if (as_ds === 0) {
        if (keyA < keyB) return 1
        if (keyA > keyB) return -1
      } else {
        if (keyA < keyB) return -1
        if (keyA > keyB) return 1
      }
      return 0
    })
  }
  sorting_category(sortList: any, as_ds: any) {
    return sortList.sort(function (a, b) {
      var keyA = a.category,
        keyB = b.category
      if (as_ds === 0) {
        if (keyA < keyB) return 1
        if (keyA > keyB) return -1
      } else {
        if (keyA < keyB) return -1
        if (keyA > keyB) return 1
      }
      return 0
    })
  }
  sorting_amount(sortList: any, as_ds: any) {
    return sortList.sort(function (a, b) {
      var keyA = parseInt(a.amount),
        keyB = parseInt(b.amount)
      if (as_ds === 0) {
        if (keyA < keyB) return 1
        if (keyA > keyB) return -1
      } else {
        if (keyA < keyB) return -1
        if (keyA > keyB) return 1
      }
      return 0
    })
  }
  // extend - Draw Chart
  setChart() {
    console.log("--- setChart")
    let day = []
    let amount = []
    this.maxAmount = 0

    // sorting
    console.log(`--- sorting`)
    this.exHistorys.sort(function (a, b) {
      var keyA = new Date(a.date),
        keyB = new Date(b.date)
      // Compare the 2 dates
      if (keyA < keyB) return 1
      if (keyA > keyB) return -1
      return 0
    })

    // set label day
    console.log(`--- setLabelDay`)
    this.exHistorys.forEach(element => {
      let printDate = `${element.year}/${element.month}/${element.day}`
      day.push(printDate)
    })
    day.sort()
    day = day.filter((element, index) => {
      return day.indexOf(element) === index
    })

    // set line amount
    console.log(`--- set line amount`)
    this.old_exCategorys_list.forEach(element => {
      element.amount = "0"
    })
    this.exCategorys.forEach(element => {
      // element.amount = "0"
      let amountPush = []
      let categorySum = 0
      let id = "" + element.id
      day.forEach(dayElement => {
        let filterResult = this.exHistorys.filter(element => `${element.year}/${element.month}/${element.day}` == dayElement && element.category_id == id)
        let sum: number = 0
        filterResult.forEach(fR => {
          sum += parseInt(fR.amount)
        })
        // set high of Chart
        if (sum > this.maxAmount) {
          this.maxAmount = sum + 25
        }
        amountPush.push(sum)
        categorySum += sum
      })
      element.amount = categorySum.toString()
      amount.push(amountPush)
    })

    if(this.oninit == "T") day = []

    let new_day = []
    day.forEach(element=>{
      new_day.push(element.slice(-8))
    })

    /* ----------==========     lineChartIncome initialization    ==========---------- */
    const data_lineChartIncome: any = {
      labels: day,
      series: amount,
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
      height: this.maxAmount == 0 ? 0 : 300,
      high: this.maxAmount,
      chartPadding: { top: 10, right: 0, bottom: 0, left: 10 },
      classNames: {
        label: "ct-label-line",
        labelGroup: "ct-labels-line",
      },
    }

    var lineChartIncome = new Chartist.Line("#lineChartIncome", data_lineChartIncome, options_lineChartIncome)
    this.startAnimationForLineChart(lineChartIncome)

    /* ----------==========     categoryChart initialization    ==========---------- */

    let categoryList = []
    let categoryAmount = []
    let max = 0
    this.exCategorys.forEach(element => {
      categoryList.push(element.category)
      categoryAmount.push(element.amount)
      if (max < parseInt(element.amount)) {
        max = parseInt(element.amount) + 50
      }
    })
    var data_categoryChart = {
      labels: categoryList,
      series: [categoryAmount],
    }
    var options_categoryChart = {
      axisX: {
        showGrid: true,
        position: "end",
        showLabel: true,
      },
      low: 0,
      height: max == 0 ? 0 : 300,
      high: max,
      chartPadding: { top: 10, right: 0, bottom: 0, left: 10 },
    }
    var responsiveOptions: any[] = [
      // [
      //   'screen and (max-width: 640px)',
      //   {
      //     seriesBarDistance: 5,
      //     axisX: {
      //       labelInterpolationFnc: function (value) {
      //         return value[0]
      //       },
      //     },
      //   },
      // ],
    ]
    var categoryChart = new Chartist.Bar("#categoryChart", data_categoryChart, options_categoryChart, responsiveOptions)
    this.startAnimationForBarChart(categoryChart)

    /* ----------=====================================================================---------- */

    // reset for select option
    this.exCategorys = this.old_exCategorys_list
    this.sort()
    if (this.exHistorys.length === 0) {
      this.showNotification("No date found. Please try again.")
    }
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
