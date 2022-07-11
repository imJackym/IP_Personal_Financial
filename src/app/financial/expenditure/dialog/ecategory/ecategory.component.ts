import { Component, Inject, OnInit } from '@angular/core'
import { ApiService } from './../../../../services/api.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-ecategory',
  templateUrl: './ecategory.component.html',
  styleUrls: ['./ecategory.component.scss'],
})
export class EcategoryComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<EcategoryComponent>,
  ) {}

  actionBtn = 'Save'
  categoryForm!: FormGroup

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      category: ['', Validators.required],
      expected_amount: [''],
      fe: ['F', Validators.required],
    })

    if (this.editData) {
      this.actionBtn = 'Update'
      this.categoryForm.controls['category'].setValue(this.editData.category)
      this.categoryForm.controls['expected_amount'].setValue(this.editData.expected_amount)
      this.categoryForm.controls['fe'].setValue(this.editData.fe)
    }
  }

  addCategory() {
    if (!this.editData) {
      if (this.categoryForm.valid) {
        this.api.postExpenditureCategory(this.categoryForm.value).subscribe({
          next: (res) => {
            alert('Record added')
            this.categoryForm.reset()
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
    this.api
      .putExpenditureCategory(this.categoryForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert(`Record Updated`)
          this.categoryForm.reset()
          this.dialogRef.close('update')
        },
        error() {
          alert('Record err')
        },
      })
  }
}