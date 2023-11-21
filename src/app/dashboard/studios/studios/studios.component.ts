import { Component, OnInit } from '@angular/core';
import { Projection } from 'src/app/model/enum/projection.enum';
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
    this.raspberryService.getMovies(Projection.STUDIOS, {}).subscribe(result => {      
      this.studios = result;
    })
  }

}
