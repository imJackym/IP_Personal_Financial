import { ApiService } from './../../services/api.service'
import { ErecordComponent } from './dialog/erecord/erecord.component'
import { EcategoryComponent } from './dialog/ecategory/ecategory.component'

import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-expenditure',
  templateUrl: './expenditure.component.html',
  styleUrls: ['./expenditure.component.scss']
})
export class ExpenditureComponent implements OnInit {
  displayedColumns: string[] = ['date', 'category', 'amount']
  dataSource!: MatTableDataSource<any>

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  exHistorys = []
  exCategorys = []

  constructor(public dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    this.getExpenditure()
    this.getCategory()
  }

  addRecord() {
    this.dialog
      .open(ErecordComponent, {
        width: '100%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getExpenditure()
          this.getCategory()
        }
      })
  }
  editRecord(record: any) {
    this.dialog
      .open(ErecordComponent, {
        width: '100%',
        data: record,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getExpenditure()
          this.getCategory()
        }
      })
  }

  addCategory() {
    this.dialog
      .open(EcategoryComponent, {})
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getExpenditure()
          this.getCategory()
        }
      })
  }
  editCategory(category: any) {
    this.dialog
      .open(EcategoryComponent, {
        width: '30%',
        data: category,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getExpenditure()
          this.getCategory()
        }
      })
  }

  getExpenditure() {
    this.api.getExpenditureRecord().subscribe({
      next: (res) => {
        this.exHistorys = res
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
    this.api.getExpenditureCategory().subscribe({
      next: async (res) => {
        this.exCategorys = res
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

  deleteRecord(id: number) {
    console.log(id)
    this.api.deleteExpenditureRecord(id).subscribe({
      next: (res) => {
        alert(`Record delete`)
        this.getExpenditure()
        this.getCategory()
      },
      error() {
        alert('Record err')
      },
    })
  }
}