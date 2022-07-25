import { Component, OnInit } from "@angular/core"
import { ApiService } from "./../../../../services/api.service"

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.scss"],
})
export class ReportComponent implements OnInit {
  constructor(private api: ApiService) {}
  iCategorys = []
  eCategorys = []

  ngOnInit(): void {}

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
          next: res => {},
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
          next: res => {},
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
}
