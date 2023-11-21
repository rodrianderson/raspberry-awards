import { Component, OnInit } from '@angular/core';
import { Studio } from 'src/app/model/studios.model';
import { RaspberryService } from 'src/app/services/raspberry.service';

@Component({
  selector: 'app-studios',
  templateUrl: './studios.component.html',
  styleUrls: ['./studios.component.scss'],
})
export class StudiosComponent  implements OnInit {

  public studios: Studio | undefined;

  constructor(private raspberryService: RaspberryService<Studio>) { }

  ngOnInit() {
    const STUDIOS = 'studios-with-win-count';
    this.raspberryService.getMovies(STUDIOS, {}).subscribe(result => {      
      this.studios = result;
    })

  }

}
