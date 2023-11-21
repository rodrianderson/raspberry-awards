import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { MovieWinnerYear } from 'src/app/model/movie-winner-year.model';
import { ParametersFilter } from 'src/app/model/parameters.model';
import { RaspberryService } from 'src/app/services/raspberry.service';

@Component({
  selector: 'app-movie-winner-year',
  templateUrl: './movie-winner-year.component.html',
  styleUrls: ['./movie-winner-year.component.scss'],
})
export class MovieWinnerYearComponent  implements OnInit {

  private parametersFilter: ParametersFilter = {};
  public movieWinnerYear: MovieWinnerYear[] = [];
  public inputYear: number | undefined;

  constructor(private raspberryService: RaspberryService<MovieWinnerYear[]>, 
              private alertController: AlertController) { }

  ngOnInit() {
    this.inputYear = 1990;
    this.getAllMovies();
    this.inputYear = undefined;
  }

  getAllMovies() {
    this.parametersFilter.winner = true;
    this.parametersFilter.year = this.inputYear;  
    this.raspberryService.getMovies('' , this.parametersFilter).subscribe(result => {
      this.movieWinnerYear = result;
    });
  }

  async presentAlertStudios(studios: string[]) {
    let studiosDescription = "";
    studios.forEach(studio => {
      studiosDescription = studiosDescription.concat(studio.concat(", "));
    });
    studiosDescription = studiosDescription.slice(0, -2);
    const alert = await this.alertController.create({
      header: 'Estudios:',
      message: studiosDescription,
      buttons: ['Fechar'],
    });

    await alert.present();
  }

  async presentAlertProducers(producers: string[]) {
    let producersDescription = "";
    producers.forEach(producers => {
      producersDescription = producersDescription.concat(producers.concat(", "));
    });
    producersDescription = producersDescription.slice(0, -2);
    const alert = await this.alertController.create({
      header: 'Produtores:',
      message: producersDescription,
      buttons: ['Fechar'],
    });

    await alert.present();
  }

}
