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
  iC_sum: number = 0
  iC_expect_sum: number = 0
  eCategorys = []
  eC_sum: number = 0
  eC_expect_sum: number = 0

  ngOnInit(): void {
    this.getiCategory()
    this.geteCategory()
    setTimeout(() => {
      this.calculate()
    }, 1000)
  }

  getiCategory() {
    console.log(`--- getiCategory`)
    let year = new Date().getFullYear()
    // let iCat_DailyAmount = []
    this.api.getIncomeCategory().subscribe({
      next: res => {
        res.forEach(element => {
          let sum = 0
          let freq = 0
          let max = 0
          let min = 0
          this.api.getIncomeRecord_ync2("year", year, "category_id", element.id).subscribe({
            next: res => {
              if (res.length > 0) {
                res.forEach((element, i) => {
                  sum += parseInt(element.amount)
                  if (max < parseInt(element.amount)) max = parseInt(element.amount)
                  if (i == 0) min = parseInt(element.amount)
                  if (min > parseInt(element.amount)) min = parseInt(element.amount)
                })
                element.sum = sum
                element.max = max
                element.min = min
                element.freq += res.length
              }
            },
            error() {
              alert("Record err")
            },
          })

          element.sum = sum
          element.max = max
          element.min = min
          element.freq = freq
        })
        this.iCategorys = res
        console.log(this.iCategorys)
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
          let sum = 0
          let freq = 0
          let max = 0
          let min = 0
          this.api.getExpenditureRecord_ync2("year", year, "category_id", element.id).subscribe({
            next: res => {
              if (res.length > 0) {
                res.forEach((element, i) => {
                  sum += parseInt(element.amount)
                  if (max < parseInt(element.amount)) max = parseInt(element.amount)
                  if (i == 0) min = parseInt(element.amount)
                  if (min > parseInt(element.amount)) min = parseInt(element.amount)
                })
                element.sum = sum
                element.max = max
                element.min = min
                element.freq += res.length
              }
            },
            error() {
              alert("Record err")
            },
          })

          element.sum = sum
          element.max = max
          element.min = min
          element.freq = freq
        })
        this.eCategorys = res
        console.log(this.eCategorys)
      },
      error() {
        alert("Record err")
      },
    })
  }
  calculate(){

    this.eCategorys.forEach(element => {
      this.eC_sum += element.sum
      this.eC_expect_sum += parseInt((element.expected_amount == '')? 0 : element.expected_amount)*12
    });
    this.iCategorys.forEach(element => {
      this.iC_sum += element.sum
      this.iC_expect_sum += parseInt((element.expected_amount == '')? 0 : element.expected_amount)*12
    });
  }
}
