import { Component, OnInit } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"
import { ApiService } from "app/services/api.service"
import { RecordComponent } from "app/financial/income/dialog/record/record.component"
import { CategoryComponent } from "app/financial/income/dialog/category/category.component"
import { ErecordComponent } from "app/financial/expenditure/dialog/erecord/erecord.component"
import { EcategoryComponent } from "app/financial/expenditure/dialog/ecategory/ecategory.component"
import * as Chartist from "chartist"

@Component({
  selector: "app-wallet",
  templateUrl: "./wallet.component.html",
  styleUrls: ["./wallet.component.scss"],
})
export class WalletComponent implements OnInit {
  constructor(public dialog: MatDialog, private api: ApiService) {}

  showDiv = {
    alert: true,
    a_more: true,
    a_less: false,

    income: false,
    i_more: true,
    i_less: false,

    bank: false,
    b_more: true,
    b_less: false,

    inv: false,
    in_more: true,
    in_less: false,

    card: false,
    c_more: true,
    c_less: false,
  }
  cash_g = []
  cash_ga: number = 0
  cash_r = []
  cash_ra: number = 0
  bank_g = []
  bank_ga: number = 0
  bank_r = []
  bank_ra: number = 0
  card_g = []
  card_ga: number = 0
  card_r = []
  card_ra: number = 0

  cate_i = []
  cate_e = []

  cash
  bank
  investment
  card

  ngOnInit(): void {
    this.getWallet()
    this.getCategory()
    setTimeout(() => {
      this.getType("cash")
      this.getType("bank")
      this.getType("card")
      setTimeout(() => {
        this.plotGraph()
      }, 1000)
    }, 1000)
  }

  getWallet() {
    this.api.getWallet().subscribe({
      next: res => {
        if (res.length > 0) {
          res.forEach(element => {
            this.cash = element.cash == "" ? 0 : parseInt(element.cash)
            this.bank = element.bank == "" ? 0 : parseInt(element.bank)
            this.investment = element.investment == "" ? 0 : parseInt(element.investment)
            this.card = element.card == "" ? 0 : parseInt(element.card)
          })
        }
      },
      error() {
        alert("Record err")
      },
    })
  }

  getCategory() {
    console.log(`--- getCategory`)
    this.api.getIncomeCategory().subscribe({
      next: res => {
        res.forEach(element => {
          let e = {
            id: element.id,
            cat: element.category,
          }
          this.cate_i.push(e)
        })
      },
      error() {
        alert("Record err")
      },
    })
    this.api.getExpenditureCategory().subscribe({
      next: res => {
        res.forEach(element => {
          let e = {
            id: element.id,
            cat: element.category,
          }
          this.cate_e.push(e)
        })
      },
      error() {
        alert("Record err")
      },
    })
  }

  getType(type: any) {
    console.log(`--- getCash`)
    this.api.getIncomeRecord_type(type).subscribe({
      next: res => {
        console.log(`getCash in`)
        let amount = 0
        // res.forEach(element => {})
        res.sort(function (a, b) {
          var keyA = a.date,
            keyB = b.date
          if (keyA < keyB) return 1
          if (keyA > keyB) return -1
        })
        res.forEach(element => {
          let cat = this.cate_i.find(e => e.id === parseInt(element.category_id))
          element.category = cat.cat
          amount += parseInt(element.amount)
        })
        if (type == "cash") {
          this.cash_ga += amount
          this.cash_g = res.slice(0, 5)
        } else if (type == "bank") {
          this.bank_ga += amount
          this.bank_g = res.slice(0, 5)
        } else if (type == "card") {
          this.card_ga += amount
          this.card_g = res.slice(0, 5)
        }
      },
      error() {
        alert("Record err")
      },
    })
    this.api.getExpenditureRecord_type(type).subscribe({
      next: res => {
        console.log(`getCash exp`)
        let amount = 0
        // res.forEach(element => {})
        res.sort(function (a, b) {
          var keyA = a.date,
            keyB = b.date
          if (keyA < keyB) return 1
          if (keyA > keyB) return -1
        })
        res.forEach(element => {
          let cat = this.cate_e.find(e => e.id === parseInt(element.category_id))
          element.category = cat.cat
          amount -= parseInt(element.amount)
        })
        if (type == "cash") {
          this.cash_ra -= amount
          this.cash_r = res.slice(0, 5)
        } else if (type == "bank") {
          this.bank_ra -= amount
          this.bank_r = res.slice(0, 5)
        } else if (type == "card") {
          this.card_ra -= amount
          this.card_r = res.slice(0, 5)
        }
      },
      error() {
        alert("Record err")
      },
    })
  }

  add_ir() {
    console.log(`--- add_ir`)
    this.dialog.open(RecordComponent, { width: "100%" }).afterClosed()
  }
  add_ic() {
    console.log(`--- add_ic`)
    this.dialog.open(CategoryComponent, { width: "100%" }).afterClosed()
  }
  add_er() {
    console.log(`--- add_er`)
    this.dialog.open(ErecordComponent, { width: "100%" }).afterClosed()
  }
  add_ec() {
    console.log(`--- add_ec`)
    this.dialog.open(EcategoryComponent, { width: "100%" }).afterClosed()
  }

  plotGraph() {
    var data = {
      series: [this.cash + this.cash_ga - this.cash_ra, this.bank + this.bank_ga - this.bank_ra, this.investment],
    }

    var sum = function (a, b) {
      return a + b
    }

    var chart = new Chartist.Pie("#walletChart", data, {
      width: 250,
      height: 250,
      donut: true,
      donutSolid: true,
      donutWidth: 60,
      showLabel: false,
      labelInterpolationFnc: function (value) {
        return Math.round((value / data.series.reduce(sum)) * 100) + "%"
      },
    })
  }
}
