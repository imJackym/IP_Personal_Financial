import { Component, OnInit } from "@angular/core"
import { ApiService } from "app/services/api.service"

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
      expend = expend_set * 12 * Math.pow(1 + rate, year)
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
      expend = expend_set * 12 * Math.pow(1 + rate, year)
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
}
