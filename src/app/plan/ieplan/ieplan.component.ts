import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ieplan',
  templateUrl: './ieplan.component.html',
  styleUrls: ['./ieplan.component.css']
})
export class IeplanComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  category_Expenditures = [
    {
      "category": "Food",
      "expected": 999999999,
      "actual": 999999999,
    },
    {
      "category": "transport",
      "expected": 111111111,
      "actual": 333333333,
    },
  ]

  category_Incomes = [
    {
      "category": "Food",
      "expected": 999999999,
      "actual": 999999999,
    },
    {
      "category": "transport",
      "expected": 111111111,
      "actual": 333333333,
    },
  ]

}
