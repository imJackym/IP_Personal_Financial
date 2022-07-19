import { ApiService } from "./../../services/api.service"
import { IecategoryComponent } from "./dialog/iecategory/iecategory.component"
import { EiecategoryComponent } from "./dialog/eiecategory/eiecategory.component"

import { Component, OnInit, ViewChild } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"

import { MatPaginator } from "@angular/material/paginator"
import { MatSort } from "@angular/material/sort"
import { MatTableDataSource } from "@angular/material/table"
import { element } from "protractor"

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

  ngOnInit(): void {
    this.getiCategory()
    this.geteCategory()
    this.getSummaryAmount()
  }

  getiCategory() {
    this.api.getIncomeCategory().subscribe({
      next: res => {
        res.forEach(element => {
          let totalAmount = 0
          element.amount = totalAmount
          this.api.getIncomeRecord_category(element.id).subscribe({
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
      },
      error() {
        alert("Record err")
      },
    })
  }
  geteCategory() {
    console.log(`--- geteCategory`)
    this.api.getExpenditureCategory().subscribe({
      next: res => {
        res.forEach(element => {
          console.log(`res---`)
          console.log(res)
          let totalAmount = 0
          element.amount = totalAmount
          this.api.getExpenditureRecord_category(element.id).subscribe({
            next: res => {
              console.log(`---res---`)
              console.log(res)
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
      },
      error() {
        alert("Record err")
      },
    })
  }
  getSummaryAmount() {
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

  pushAmount(name: string, num: number) {
    this.SAmount[name] = num
  }
}
