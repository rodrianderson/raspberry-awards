import { Component, OnInit } from '@angular/core';
import { Projection } from 'src/app/model/enum/projection.enum';
import { MultipleWinners } from 'src/app/model/multiple-winners.model';
import { RaspberryService } from 'src/app/services/raspberry.service';

@Component({
  selector: 'app-multiple-winners',
  templateUrl: './multiple-winners.component.html',
  styleUrls: ['./multiple-winners.component.scss'],
})
export class MultipleWinnersComponent  implements OnInit {
  public multipleWinners: MultipleWinners | undefined;

  constructor(private raspberryService: RaspberryService<MultipleWinners>) { }

  ngOnInit() {
    this.raspberryService.getMovies(Projection.MULTIPLE_WINNERS, {}).subscribe(result => {
      this.multipleWinners = result;
    })
  }

}
