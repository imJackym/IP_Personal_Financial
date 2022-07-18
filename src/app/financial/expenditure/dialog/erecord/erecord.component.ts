import { CategoryComponent } from './../../../income/dialog/category/category.component'
import { Component, Inject, OnInit } from '@angular/core'
import { ApiService } from './../../../../services/api.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-erecord',
  templateUrl: './erecord.component.html',
  styleUrls: ['./erecord.component.scss'],
})
export class ErecordComponent implements OnInit {
  categorys = []
  actionBtn = 'Save'

  recordForm!: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<ErecordComponent>,
  ) {}

  ngOnInit(): void {
    this.recordForm = this.formBuilder.group({
      date: ['', Validators.required],
      month: [''],
      year: [''],
      category_id: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
    })
    this.getCategory()
  }

  getCategory() {
    this.api.getExpenditureCategory().subscribe({
      next: (res) => {
        this.categorys = res
        this.edit_Data()
      },
      error() {
        alert('Record err')
      },
    })
  }
  edit_Data() {
    if (this.editData) {
      this.actionBtn = 'Update'
      this.recordForm.controls['date'].setValue(this.editData.date)
      this.recordForm.controls['month'].setValue(this.editData.month)
      this.recordForm.controls['year'].setValue(this.editData.year)
      this.categorys.forEach((element) => {
        if (this.editData.category == element.category) {
          this.recordForm.controls['category_id'].setValue('' + element.id)
        }
      })
      this.recordForm.controls['amount'].setValue(this.editData.amount)
    }
  }

  addRecord() {
    if (!this.editData) {
      if (this.recordForm.valid) {
        this.getDate()
        this.api.postExpenditureRecord(this.recordForm.value).subscribe({
          next: (res) => {
            alert('Record added')
            this.recordForm.reset()
            this.dialogRef.close('save')
          },
          error() {
            alert('Record err')
          },
        })
      }
    } else {
      this.updateRecord()
    }
  }
  updateRecord() {
    this.getDate()
    this.api
      .putExpenditureRecord(this.recordForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert(`Record Updated`)
          this.recordForm.reset()
          this.dialogRef.close('update')
        },
        error() {
          alert('Record err')
        },
      })
  }

  getDate() {
    let date = '' + this.recordForm.get('date').value
    let fullDate = date.split('-')
    let month = fullDate[1]
    switch (month) {
      case 'Jan':
        this.recordForm.get('month').setValue(1)
        break
      case 'Feb':
        this.recordForm.get('month').setValue(2)
        break
      case 'Mar':
        this.recordForm.get('month').setValue(3)
        break
      case 'Apr':
        this.recordForm.get('month').setValue(4)
        break
      case 'May':
        this.recordForm.get('month').setValue(5)
        break
      case 'Jun':
        this.recordForm.get('month').setValue(6)
        break
      case 'Jul':
        this.recordForm.get('month').setValue(7)
        break
      case 'Aug':
        this.recordForm.get('month').setValue(8)
        break
      case 'Sep':
        this.recordForm.get('month').setValue(9)
        break
      case 'Oct':
        this.recordForm.get('month').setValue(10)
        break
      case 'Nov':
        this.recordForm.get('month').setValue(11)
        break
      case 'Dec':
        this.recordForm.get('month').setValue(12)
        break
      default:
        console.log(`Sorry, ${month}`)
    }
    console.log('date')
    console.log(date)
    console.log(fullDate)
    console.log(fullDate[0])
    this.recordForm.get('year').setValue(fullDate[0])
  }
}
