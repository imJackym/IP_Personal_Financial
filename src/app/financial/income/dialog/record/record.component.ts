import { Component, Inject, OnInit } from '@angular/core'
import { ApiService } from './../../../../services/api.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
})

export class RecordComponent implements OnInit {
  categorys = []
  actionBtn = 'Save'

  recordForm!: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<RecordComponent>,
  ) {}

  ngOnInit(): void {
    this.recordForm = this.formBuilder.group({
      date: ['', Validators.required],
      month: [''],
      year: [''],
      day: [''],
      type: [''],
      category_id: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
    })
    this.getCategory()
  }

  getCategory() {
    this.api.getIncomeCategory().subscribe({
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
      this.recordForm.controls['day'].setValue(this.editData.day)
      this.categorys.forEach((element) => {
        if (this.editData.category == element.category) {
          this.recordForm.controls['category_id'].setValue('' + element.id)
        }
      })
      this.recordForm.controls['type'].setValue(this.editData.type)
      this.recordForm.controls['amount'].setValue(this.editData.amount)
    }
  }

  addRecord() {
    if (!this.editData) {
      if (this.recordForm.valid) {
        this.getDate()
        this.api.postIncomeRecord(this.recordForm.value).subscribe({
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
      .putIncomeRecord(this.recordForm.value, this.editData.id)
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

  // 0    m1  d2  y3
  // Mon Jul 18 2022 00:00:00 GMT+0800 (台北標準時間)
  getDate() {
    let date = this.recordForm.get('date').value.toString()
    date = new Date(date)
    console.log('getDate : ' + date)
    date = date.toString()
    let fullDate = date.split(' ')
    console.log("1 --")
    let month = fullDate[1]
    console.log(`month : ${month}`)
    console.log(`this.recordForm.get('month')`)
    console.log(this.recordForm.get('month').value)
    switch (month) {
      case 'Jan':
        this.recordForm.get('month').setValue("01")
        break
      case 'Feb':
        this.recordForm.get('month').setValue("02")
        break
      case 'Mar':
        this.recordForm.get('month').setValue("03")
        break
      case 'Apr':
        this.recordForm.get('month').setValue("04")
        break
      case 'May':
        this.recordForm.get('month').setValue("05")
        break
      case 'Jun':
        this.recordForm.get('month').setValue("06")
        break
      case 'Jul':
        this.recordForm.get('month').setValue("07")
        break
      case 'Aug':
        this.recordForm.get('month').setValue("08")
        break
      case 'Sep':
        this.recordForm.get('month').setValue("09")
        break
      case 'Oct':
        this.recordForm.get('month').setValue("10")
        break
      case 'Nov':
        this.recordForm.get('month').setValue("11")
        break
      case 'Dec':
        this.recordForm.get('month').setValue("12")
        break
      default:
        console.log(`Sorry, ${month}`)
    }
    console.log(`year : `)
    console.log(`${fullDate[3]}`)
    this.recordForm.get('year').setValue(fullDate[3])
    console.log(`day : `)
    console.log(`${fullDate[2]}`)
    this.recordForm.get('day').setValue(fullDate[2])
    console.log("end")
  }
}
