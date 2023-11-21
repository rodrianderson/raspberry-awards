import { Component, OnInit } from '@angular/core';
import { Projection } from 'src/app/model/enum/projection.enum';
import { MaxMinWin } from 'src/app/model/max-min-win.model';
import { RaspberryService } from 'src/app/services/raspberry.service';

@Component({
  selector: 'app-max-min-win',
  templateUrl: './max-min-win.component.html',
  styleUrls: ['./max-min-win.component.scss'],
})
export class MaxMinWinComponent  implements OnInit {

  public maxMinWin: MaxMinWin | undefined;

  constructor(private raspberryService: RaspberryService<MaxMinWin>) { }

  ngOnInit() {
    this.raspberryService.getMovies(Projection.MAX_MIN_WIN, {}).subscribe(result => {
      this.maxMinWin = result;
    })
  }
}
