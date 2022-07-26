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
  planB_year
  planB_remain
  planB_end_p
  planC: boolean = false
  planD: boolean = false

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
      this.inflation_cal()
      this.planC
      this.planD
    }, 1000)
  }

  get_year_exp(v, y){
    return v * 12 * Math.pow(1 + 0.034, y)
  }

  inflation_cal_t(v){
    let toA = this.total_asset
    let inflation_rate = 0.034
    let expend = 0
    let t = 1
    for (t = 1; t < 65 - 25; t++) {
      expend = v * 12 * Math.pow(1 + inflation_rate, t)
      toA = toA - expend
      if (toA < 0) {
        toA = toA + expend
        return t - 1
      }
    }
    return t
  }

  inflation_cal_v(){
    let toA = this.total_asset
    let inflation_rate = 0.034
    let expend = 0
    let t = 1
    for (t = 1; t < 65 - 25; t++) {
      expend = this.total_expenditure * 12 * Math.pow(1 + inflation_rate, t)
      toA = toA - expend
      if (toA < 0) {
        toA = toA + expend
        this.planB_year = t - 1
        break
      }
    }
    return toA
  }

  inflation_cal() {
    let toA = this.total_asset
    let inflation_rate = 0.034
    let expend = 0
    for (let t = 1; t < 65 - 25; t++) {
      expend = this.total_expenditure * 12 * Math.pow(1 + inflation_rate, t)
      toA = toA - expend
      if (toA < 0) {
        toA = toA + expend
        this.planB_year = t - 1
        console.log(`inflation_cal : t ${t}`)
        break
      }
    }
    this.planB_remain = toA
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
