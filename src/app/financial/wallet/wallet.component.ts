import { Component, OnInit } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"
import { ApiService } from "app/services/api.service"
import * as Chartist from "chartist"
import { element } from "protractor"

@Component({
  selector: "app-wallet",
  templateUrl: "./wallet.component.html",
  styleUrls: ["./wallet.component.scss"],
})
export class WalletComponent implements OnInit {
  constructor(public dialog: MatDialog, private api: ApiService) {}

  showDiv = {
    income: false,
    i_more: true,
    i_less: false,

    bank: false,
    b_more: true,
    b_less: false,

    card: false,
    c_more: true,
    c_less: false,
  }
  cash_g = []
  cash_r = []
  bank_g = []
  bank_r = []
  card_g = []
  card_r = []
  cate = [
    { id: 1, cat: "test11" },
    { id: 2, cat: "aaa" },
  ]

  ngOnInit(): void {
    this.plotGraph()
    this.getCategory()
    this.getCash()
  }

  getCategory() {
    this.api.getIncomeCategory().subscribe({
      next: res => {
        console.log(`--- getCategory`)
        res.forEach(element => {
          let e = {
            id: element.id,
            cat: element.category,
          }
          this.cate.push(e)
        })
      },
      error() {
        alert("Record err")
      },
    })
  }

  getCash() {
    console.log(this.cate)
    this.api.getIncomeRecord_type("cash").subscribe({
      next: res => {
        console.log(`getCash in`)
        // res.forEach(element => {})
        res.sort(function (a, b) {
          var keyA = a.date,
            keyB = b.date
          if (keyA < keyB) return 1
          if (keyA > keyB) return -1
        })
        // console.log(res)
        res.forEach(element => {
          let cat = this.cate.find(e => {
            // console.log(e)
            // console.log(`element.category_id || ${element.category_id}`)
            // console.log(`~~~~~~~~~~~~~~~~~~`)
            e.id == parseInt(element.category_id)
          })
          element.category = cat
        })
        console.log(`res`)
        console.log(res)
        this.cash_g = res.slice(0, 5)
      },
      error() {
        alert("Record err")
      },
    })
    this.api.getExpenditureRecord_type("cash").subscribe({
      next: res => {
        console.log(`getCash exp`)
        // res.forEach(element => {})
        res.sort(function (a, b) {
          var keyA = a.date,
            keyB = b.date
          if (keyA < keyB) return 1
          if (keyA > keyB) return -1
        })
        // console.log(res)
        this.cash_r = res
      },
      error() {
        alert("Record err")
      },
    })
  }

  getBank() {}

  getCard() {}

  plotGraph() {
    var data = {
      series: [5, 3, 4, 1],
    }

    var sum = function (a, b) {
      return a + b
    }

    new Chartist.Pie("#dailySalesChart", data, {
      width: 500,
      donutWidth: 250,
      height: 500,
      donut: false,
      labelDirection: "implode",
      labelInterpolationFnc: function (value) {
        return Math.round((value / data.series.reduce(sum)) * 100) + "%"
      },
    })
  }
}
