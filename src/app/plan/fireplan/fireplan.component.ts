import { Component, OnInit } from "@angular/core"
import { ApiService } from "app/services/api.service"
import * as Chartist from "chartist"

@Component({
  selector: "app-fireplan",
  templateUrl: "./fireplan.component.html",
  styleUrls: ["./fireplan.component.scss"],
})
export class FireplanComponent implements OnInit {
  // equation : 2.89 ^ (83 - current_year_old) * expenditure * 12 = total expenditure => total Asset

  constructor(private api: ApiService) {}

  showDiv = {
    info: true,
    i_more: true,
    i_less: false,
  }
  planA_thm_click = true
  planA_exp_click = true
  planA_act_click = true
  planB_exp_click = true
  planB_act_click = true
  planD_exp_click = true
  planD_act_click = true

  total_passive_income: number = 0
  total_expenditure: number = 0
  total_exp_expenditure: number = 0
  total_asset: number = 0
  year
  planA_act: boolean = false
  planA_exp: boolean = false
  planB: boolean = false
  planB_exp_year_count: boolean = true
  planB_act_year_count: boolean = true
  planB_end_p
  planD_exp_year_count: boolean = true
  planD_act_year_count: boolean = true

  ngOnInit(): void {
    this.get_passive_income()
    this.get_total_expenditure()
    this.get_total_exp_expenditure()
    this.get_asset()
    this.year = new Date().getFullYear()

    setTimeout(() => {
      this.planA_act = this.total_asset * 0.04 - this.total_expenditure * 12 > 0
      this.planA_exp = this.total_asset * 0.04 - this.total_exp_expenditure * 12 > 0
      this.planB_end_p = this.total_expenditure * 12 * Math.pow(1 + 0.034, 40)
      setTimeout(() => {
        this.plot_graph()
      }, 1000)
    }, 1000)
  }

  get_year_exp(v, y) {
    return v * 12 * Math.pow(1 + 0.034, y)
  }

  inflation_cal(return_type, ae, expend_set, year: number = 40, rate: number = 0.034) {
    let toA = this.total_asset
    let expend = 0
    let t = 1
    for (t = 1; t < year; t++) {
      expend = expend_set * 12 * Math.pow(1 + rate, t - 1)
      toA = toA - expend
      if (toA < 0) {
        toA = toA + expend
        if (ae == "exp") this.planB_exp_year_count = false
        if (ae == "act") this.planB_act_year_count = false
        if (return_type == "time") return t - 1
      }
    }
    if (return_type == "remain") return toA
    if (return_type == "time") return t
  }

  inflation_planD_cal(return_type, ae, expend_set, year: number = 40, rate: number = 0.034) {
    let toA = this.total_asset
    let expend = 0
    let t = 1
    for (t = 1; t < year; t++) {
      expend = expend_set * 12 * Math.pow(1 + rate, t - 1)
      toA = toA - expend + this.total_passive_income * 12
      if (toA < 0) {
        toA = toA + expend
        if (ae == "exp") this.planD_exp_year_count = false
        if (ae == "act") this.planD_act_year_count = false
        if (return_type == "time") return t - 1
      }
    }
    if (return_type == "remain") return toA
    if (return_type == "time") return t
  }

  get_passive_income() {
    this.api.getIncomeCategory_pi().subscribe({
      next: res => {
        if (res.length > 0) {
          res.forEach(element => {
            this.total_passive_income += element.expected_amount == "" ? 0 : parseInt(element.expected_amount)
          })
        }
      },
      error() {
        alert("Record err")
      },
    })
  }

  get_total_expenditure() {
    this.api.getExpenditureRecord_ync1("year", 2022).subscribe({
      next: res => {
        console.log(res)
        if (res.length > 0) {
          res.forEach(element => {
            this.total_expenditure += element.amount == "" ? 0 : parseInt(element.amount)
          })
        }
      },
      error() {
        alert("Record err")
      },
    })
  }

  get_total_exp_expenditure() {
    this.api.getExpenditureCategory_fe().subscribe({
      next: res => {
        if (res.length > 0) {
          res.forEach(element => {
            this.total_exp_expenditure += element.expected_amount == "" ? 0 : parseInt(element.expected_amount)
          })
        }
      },
      error() {
        alert("Record err")
      },
    })
  }

  get_asset() {
    this.api.getWallet().subscribe({
      next: res => {
        if (res.length > 0) {
          res.forEach(element => {
            let cash = element.cash == "" ? 0 : parseInt(element.cash)
            let bank = element.bank == "" ? 0 : parseInt(element.bank)
            let investment = element.investment == "" ? 0 : parseInt(element.investment)
            let card = element.card == "" ? 0 : parseInt(element.card)
            this.total_asset = cash + bank + investment - card
          })
        }
      },
      error() {
        alert("Record err")
      },
    })
  }

  plot_graph() {
    let year = new Date().getFullYear()
    let year_x = []
    for (let y = 1; y < 26; y++) {
      year_x[y - 1] = y + "y"
    }
    let year_y_thm = []
    let year_y_exp = []
    let year_y_act = []
    let year_y_b_exp = []
    let year_y_b_exp_remain = this.total_asset
    let year_y_b_act = []
    let year_y_b_act_remain = this.total_asset

    let year_y_d_exp = []
    let year_y_d_exp_remain = this.total_asset
    let year_y_d_act = []
    let year_y_d_act_remain = this.total_asset

    for (let y = 0; y < 25; y++) {
      year_y_thm[y] = this.total_asset - this.total_asset * 0.04 * y
      year_y_exp[y] = this.total_asset - this.total_exp_expenditure * 12 * y
      year_y_act[y] = this.total_asset - this.total_expenditure * 12 * y

      year_y_b_exp[y] = year_y_b_exp_remain - this.get_year_exp(this.total_exp_expenditure, y)
      year_y_b_exp_remain = year_y_b_exp_remain - this.get_year_exp(this.total_exp_expenditure, y)

      year_y_b_act[y] = year_y_b_act_remain - this.get_year_exp(this.total_expenditure, y)
      year_y_b_act_remain = year_y_b_act_remain - this.get_year_exp(this.total_expenditure, y)

      year_y_d_exp[y] = year_y_d_exp_remain - this.get_year_exp(this.total_exp_expenditure, y) + this.total_passive_income * 12
      year_y_d_exp_remain = year_y_d_exp_remain - this.get_year_exp(this.total_exp_expenditure, y) + this.total_passive_income * 12

      year_y_d_act[y] = year_y_d_act_remain - this.get_year_exp(this.total_expenditure, y) + this.total_passive_income * 12
      year_y_d_act_remain = year_y_d_act_remain - this.get_year_exp(this.total_expenditure, y) + this.total_passive_income * 12
    }

    var planA_thm_data = {
      labels: year_x,
      series: [year_y_thm],
    }
    var planA_exp_data = {
      labels: year_x,
      series: [year_y_exp],
    }
    var planA_act_data = {
      labels: year_x,
      series: [year_y_act],
    }

    var planB_exp_data = {
      labels: year_x,
      series: [year_y_b_exp],
    }
    var planB_act_data = {
      labels: year_x,
      series: [year_y_b_act],
    }

    var planD_exp_data = {
      labels: year_x,
      series: [year_y_d_exp],
    }
    var planD_act_data = {
      labels: year_x,
      series: [year_y_d_act],
    }

    var optionsChart = {
      axisX: {
        showGrid: false,
      },
      low: 0,
      high: this.total_asset + 500,
      height: 250,
      chartPadding: { top: 10, right: 20, bottom: 0, left: 20 },
    }
    var planA_thm = new Chartist.Bar("#planA_thm", planA_thm_data, optionsChart, [])
    var planA_exp = new Chartist.Bar("#planA_exp", planA_exp_data, optionsChart, [])
    var planA_act = new Chartist.Bar("#planA_act", planA_act_data, optionsChart, [])
    var planB_exp = new Chartist.Bar("#planB_exp", planB_exp_data, optionsChart, [])
    var planB_act = new Chartist.Bar("#planB_act", planB_act_data, optionsChart, [])
    var planD_exp = new Chartist.Bar("#planD_exp", planD_exp_data, optionsChart, [])
    var planD_act = new Chartist.Bar("#planD_act", planD_act_data, optionsChart, [])

    // this.planA_thm_click = false
    // this.planA_exp_click = false
    // this.planA_act_click = false
    // this.planB_epx_click = false
    // this.planB_act_click = false
    // this.planD_exp_click = false
    // this.planD_act_click = false

    this.startAnimationForBarChart(planA_thm)
    this.startAnimationForBarChart(planA_exp)
    this.startAnimationForBarChart(planA_act)
    this.startAnimationForBarChart(planB_exp)
    this.startAnimationForBarChart(planB_act)
    this.startAnimationForBarChart(planD_exp)
    this.startAnimationForBarChart(planD_act)
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
