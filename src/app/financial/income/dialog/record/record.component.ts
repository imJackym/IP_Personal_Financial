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
      category: ['', Validators.required],
      amount: ['', Validators.required],
    })
    this.getCategory()

    if (this.editData) {
      this.actionBtn = 'Update'
      this.recordForm.controls['date'].setValue(this.editData.date)
      this.recordForm.controls['month'].setValue(this.editData.month)
      this.recordForm.controls['category'].setValue(this.editData.category)
      this.recordForm.controls['amount'].setValue(this.editData.amount)
    }
  }

  getCategory() {
    this.api.getIncomeCategory().subscribe({
      next: (res) => {
        res.forEach((element) => {
          this.categorys.push(element['category'])
        })
      },
      error() {
        alert('Record err')
      },
    })
  }

  addRecord() {
    if (!this.editData) {
      if (this.recordForm.valid) {
        this.getMonth()
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
    this.getMonth()
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

  deleteRecord(id: number) {
    this.api.deleteIncomeRecord(id).subscribe({
      next: (res) => {
        alert(`Record delete`)
      },
      error() {
        alert('Record err')
      },
    })
  }

  getMonth() {
    let date = '' + this.recordForm.get('date').value
    let fullDate = date.split(' ')
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
  }
}
