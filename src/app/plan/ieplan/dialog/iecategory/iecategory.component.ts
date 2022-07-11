import { Component, Inject, OnInit } from '@angular/core'
import { ApiService } from './../../../../services/api.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-iecategory',
  templateUrl: './iecategory.component.html',
  styleUrls: ['./iecategory.component.scss'],
})
export class IecategoryComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<IecategoryComponent>,
  ) {}

  actionBtn = 'Save'
  pi_fe = ''
  pi_fe_title = ''
  pi_fe_hint = ''
  categoryForm!: FormGroup

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      category: ['', Validators.required],
      expected_amount: ['', Validators.pattern(/^[0-9]\d*$/)],
      pi: ['F', Validators.required],
    })

    if (this.editData) {
      this.actionBtn = 'Update'
      this.categoryForm.controls['category'].setValue(this.editData.category)
      this.categoryForm.controls['expected_amount'].setValue(
        this.editData.expected_amount,
      )
      this.categoryForm.controls['pi'].setValue(this.editData.pi)
    }
  }

  updateCategory() {
    this.api
      .putIncomeCategory(this.categoryForm.value, this.editData.id)
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
