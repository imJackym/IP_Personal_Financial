import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fireplan',
  templateUrl: './fireplan.component.html',
  styleUrls: ['./fireplan.component.scss']
})
export class FireplanComponent implements OnInit {

  // equation : 1.89 * (83 - current_year_old) * expenditure * 12 = total expenditure => total Asset

  constructor() { }

  ngOnInit(): void {
  }

}
