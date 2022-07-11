import { ApiService } from './../../services/api.service'
import { RecordComponent } from './dialog/record/record.component'
import { CategoryComponent } from './dialog/category/category.component'

import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss'],
})
export class IncomeComponent implements OnInit {
  displayedColumns: string[] = ['date', 'category', 'amount']
  dataSource!: MatTableDataSource<any>

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(public dialog: MatDialog, private api: ApiService) {}

  icHistorys = []
  icCategorys = []

  ngOnInit(): void {
    this.getIncome()
    this.getCategory()
  }

  addRecord() {
    this.dialog
      .open(RecordComponent, {
        width: '100%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getIncome()
          this.getCategory()
        }
      })
  }
  editRecord(icHistory: any) {
    this.dialog
      .open(RecordComponent, {
        width: '100%',
        data: icHistory,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getIncome()
          this.getCategory()
        }
      })
  }

  addCategory() {
    this.dialog
      .open(CategoryComponent, {})
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getIncome()
          this.getCategory()
        }
      })
  }

  getIncome() {
    this.api.getIncomeRecord().subscribe({
      next: (res) => {
        this.icHistorys = res
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      error() {
        alert('Record err')
      },
    })
  }

  getCategory() {
    this.api.getIncomeCategory().subscribe({
      next: async (res) => {
        this.icCategorys = res
        res.forEach((element) => {
          this.findExpectAmount(element.category, element)
        })
      },
      error() {
        alert('Record err')
      },
    })
  }

  findExpectAmount(resCategory: any, res: any) {
    var totalAmount = 0
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
  }

  deleteRecord(id: number) {
    console.log(id)
    this.api.deleteIncomeRecord(id).subscribe({
      next: (res) => {
        alert(`Record delete`)
        this.getIncome()
        this.getCategory()
      },
      error() {
        alert('Record err')
      },
    })
  }
}
