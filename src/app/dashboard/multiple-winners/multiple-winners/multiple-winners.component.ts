import { Component, OnInit } from '@angular/core';
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
    const MULTIPLE_WINNERS = 'years-with-multiple-winners';
    this.raspberryService.getMovies(MULTIPLE_WINNERS, {}).subscribe(result => {
      this.multipleWinners = result;
    })
  }

}
