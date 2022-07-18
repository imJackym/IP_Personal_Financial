import { Component, OnInit } from '@angular/core'
import * as Chartist from 'chartist'

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {

  datapack = {
    name: '',
    description: '',
    available: false
  };

  ngOnInit(): void {
    var data = {
      series: [5, 3, 4, 1, 3, 7, 3, 5]
    };
    
    var sum = function(a, b) { 
      return a + b 
    };
    
    new Chartist.Pie('#dailySalesChart', data, {
      width: 200,
      labelInterpolationFnc: function(value) {
        return Math.round(value / data.series.reduce(sum) * 100) + '%';
      }
    });
  }

  onexpand(id){
    // console.log("onexpand : " + id)
    // document.getElementById(id).setAttribute('display', 'none');
  }

}
