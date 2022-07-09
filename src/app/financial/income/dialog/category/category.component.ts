import { Component, OnInit } from '@angular/core'
import { ApiService } from './../../../../services/api.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<CategoryComponent>,
  ) {}

  categoryForm!: FormGroup

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      category: ['', Validators.required],
      expected_amount: ['', ],
      pi: ['F', Validators.required]
    })
  }

  addCategory() {
    if (this.categoryForm.valid) {
      this.api.postIncomeCategory(this.categoryForm.value).subscribe({
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
  }
}
