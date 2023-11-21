import { Component, OnInit } from '@angular/core';
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
    const MAX_MIN_WIN = 'max-min-win-interval-for-producers';

    this.raspberryService.getMovies(MAX_MIN_WIN, {}).subscribe(result => {
      this.maxMinWin = result;
    })
  }
}
