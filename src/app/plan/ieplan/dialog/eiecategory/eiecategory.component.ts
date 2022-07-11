import { Component, Inject, OnInit } from '@angular/core'
import { ApiService } from './../../../../services/api.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-eiecategory',
  templateUrl: './eiecategory.component.html',
  styleUrls: ['./eiecategory.component.scss'],
})
export class EiecategoryComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<EiecategoryComponent>,
  ) {}

  actionBtn = 'Save'
  categoryForm!: FormGroup

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      category: ['', Validators.required],
      expected_amount: ['', Validators.pattern(/^[0-9]\d*$/)],
      fe: ['F', Validators.required],
    })

    if (this.editData) {
      this.actionBtn = 'Update'
      this.categoryForm.controls['category'].setValue(this.editData.category)
      this.categoryForm.controls['expected_amount'].setValue(this.editData.expected_amount)
      this.categoryForm.controls['fe'].setValue(this.editData.fe)
    }
  }

  updateCategory() {
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