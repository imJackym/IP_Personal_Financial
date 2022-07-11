import { ApiService } from './../../services/api.service'
import { IecategoryComponent } from './dialog/iecategory/iecategory.component'
import { EiecategoryComponent } from './dialog/eiecategory/eiecategory.component'

import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-ieplan',
  templateUrl: './ieplan.component.html',
  styleUrls: ['./ieplan.component.css'],
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
      next: async (res) => {
        this.iCategorys = res
        res.forEach((element) => {
          this.findActualAmount(element.category, element, 'i')
        })
      },
      error() {
        alert('Record err')
      },
    })
  }
  geteCategory() {
    this.api.getExpenditureCategory().subscribe({
      next: async (res) => {
        this.eCategorys = res
        res.forEach((element) => {
          this.findActualAmount(element.category, element, 'e')
        })
      },
      error() {
        alert('Record err')
      },
    })
  }
  getSummaryAmount() {
    let iexpectAmount = 0
    this.api.getIncomeCategory().subscribe({
      next: async (res) => {
        if (res.length > 0) {
          await res.forEach((element: any) => {
            iexpectAmount += parseInt(
              element.expected_amount ? element.expected_amount : '0',
            )
          })
        }
        this.pushAmount('iexpectAmount', iexpectAmount)
      },
      error() {
        alert('Record err')
      },
    })
    let eexpectAmount = 0
    this.api.getExpenditureCategory().subscribe({
      next: async (res) => {
        if (res.length > 0) {
          await res.forEach((element: any) => {
            eexpectAmount += parseInt(
              element.expected_amount ? element.expected_amount : '0',
            )
          })
        }
        this.pushAmount('eexpectAmount', eexpectAmount)
      },
      error() {
        alert('Record err')
      },
    })
    let eAmount: number = 0
    this.api.getExpenditureRecord().subscribe({
      next: async (res) => {
        if (res.length > 0) {
          await res.forEach((element: any) => {
            eAmount += parseInt(element.amount ? element.amount : '0')
          })
        }
        this.pushAmount('eAmount', eAmount)
      },
      error() {
        alert('Record err')
      },
    })
    let iAmount: number = 0
    this.api.getIncomeRecord().subscribe({
      next: async (res) => {
        if (res.length > 0) {
          await res.forEach((element: any) => {
            iAmount += parseInt(element.amount ? element.amount : '0')
          })
        }
        this.pushAmount('iAmount', iAmount)
      },
      error() {
        alert('Record err')
      },
    })
  }

  editCategory(row: any) {
    if(row.pi){
      this.dialog
        .open(IecategoryComponent, {
          width: '100%',
          data: row,
        })
        .afterClosed()
        .subscribe((val) => {
          if (val === 'update') {
            this.getiCategory()
            this.geteCategory()
            this.getSummaryAmount()
          }
        })
    }
    if(row.fe){
      this.dialog
        .open(EiecategoryComponent, {
          width: '100%',
          data: row,
        })
        .afterClosed()
        .subscribe((val) => {
          if (val === 'update') {
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
  findActualAmount(resCategory: any, res: any, ie: any) {
    var totalAmount = 0
    if (ie === 'i') {
      this.api.getIncomeRecord_category(resCategory).subscribe({
        next: async (res_record) => {
          if (res_record.length > 0) {
            res_record.forEach((element) => {
              totalAmount += parseInt(element.amount)
            })
            res.amount = totalAmount.toString()
          }
        },
        error() {
          alert('Record err')
        },
      })
    } else if (ie === 'e') {
      this.api.getExpenditureRecord_category(resCategory).subscribe({
        next: async (res_record) => {
          if (res_record.length > 0) {
            res_record.forEach((element) => {
              totalAmount += parseInt(element.amount)
            })
            res.amount = totalAmount.toString()
          }
        },
        error() {
          alert('Record err')
        },
      })
    }
  }
}
