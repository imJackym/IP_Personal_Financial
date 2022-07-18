import { ApiService } from './../../services/api.service'
import { ErecordComponent } from './dialog/erecord/erecord.component'
import { EcategoryComponent } from './dialog/ecategory/ecategory.component'

import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-expenditure',
  templateUrl: './expenditure.component.html',
  styleUrls: ['./expenditure.component.scss'],
})
export class ExpenditureComponent implements OnInit {
  constructor(public dialog: MatDialog, private api: ApiService) {}

  exHistorys = []
  exCategorys = []

  ngOnInit(): void {
    this.onload()
  }

  // Record
  addRecord() {
    this.dialog
      .open(ErecordComponent, { width: '100%' })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.onload()
        }
      })
  }
  editRecord(record: any) {
    this.dialog
      .open(ErecordComponent, { width: '100%', data: record })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.onload()
        }
      })
  }

  // Category
  addCategory() {
    this.dialog
      .open(EcategoryComponent, { width: '100%' })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.onload()
        }
      })
  }
  editCategory(category: any) {
    this.dialog
      .open(EcategoryComponent, { width: '100%', data: category })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.onload()
        }
      })
  }

  // ngOnInit()
  onload() {
    this.getCategory()
    this.getExpenditure()
  }
  getExpenditure() {
    this.api.getExpenditureRecord().subscribe({
      next: (res) => {
        res.forEach((element) => {
          this.exCategorys.forEach((e) => {
            if (e.id == element.category_id) {
              element['category'] = e.category
            }
          })
        })
        this.exHistorys = res
      },
      error() {
        alert('Record err')
      },
    })
  }
  getCategory() {
    this.api.getExpenditureCategory().subscribe({
      next: async (res) => {
        this.exCategorys = res
        res.forEach((element) => {
          this.findExpectAmount(element)
        })
      },
      error() {
        alert('Record err')
      },
    })
  }
  // extend
  findExpectAmount(res: any) {
    var totalAmount = 0
    this.api.getExpenditureRecord_category(res.id).subscribe({
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
