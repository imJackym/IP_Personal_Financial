import { Component, OnInit } from '@angular/core'
import * as Chartist from 'chartist'

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    var data = {
      series: [5, 3, 4, 1, 3, 7, 3, 5]
    };
    
    var sum = function(a, b) { 
      return a + b 
    };
    
    new Chartist.Pie('#dailySalesChart', data, {
      width: '100%',
      labelInterpolationFnc: function(value) {
        console.log("value : " + value)
        console.log("----- : " + data.series.reduce(sum) * 100)
        return Math.round(value / data.series.reduce(sum) * 100) + '%';
      }
    });
  }

  onexpand(id){
    console.log("onexpand : " + id)
    // document.getElementById(id).setAttribute('display', 'none');
  }

}
