import { Component } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { RaspberryService } from '../services/raspberry.service';
import { PaginationMovies } from '../model/pagination-movies.model';
import { ParametersFilter } from '../model/parameters.model';
import { Movies } from '../model/movies.model';

@Component({
  selector: 'movies',
  templateUrl: 'movies.page.html',
  styleUrls: ['movies.page.scss'],
})
export class MoviesComponent {
  public inputYear: number | undefined;
  public inputWinner: string = 'default';
  public paginationMovies: PaginationMovies | undefined;
  public moviesFilter: Movies[] | undefined;
  public items: number[] = [];
  public pagenation = 0;
  public optionsWiner: string[] = ['Yes', 'No'];
  private parametersFilter: ParametersFilter = {};

  constructor(
    private raspberryService: RaspberryService<PaginationMovies>,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const startPage = 0;
    const startSize = 15;
    this.parametersFilter.page = startPage;
    this.parametersFilter.size = startSize;
    this.getAllMovies();
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    this.pagenation = this.pagenation + 1;
    this.parametersFilter.page = this.pagenation;
    this.getAllMovies();

    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 100);
  }

  getAllMovies() {
    if (this.inputYear) {
      const startPage = 0;
      const maxPage = 99;
      this.paginationMovies = undefined;
      this.parametersFilter.page = startPage;
      this.parametersFilter.year = this.inputYear;
      this.parametersFilter.size = maxPage;
    }
    this.raspberryService
      .getMovies('', this.parametersFilter)
      .subscribe((result) => {
        if (this.paginationMovies) {
          this.paginationMovies.content = this.paginationMovies.content.concat(
            result.content
          );
        } else {
          this.paginationMovies = result;
        }
      });
  }

  filterYear() {
    if (this.paginationMovies) {
      this.paginationMovies.content = this.paginationMovies.content.filter(
        (filter) => {
          return filter.year == this.inputYear;
        }
      );
    }
  }

  filterWinner() {
    if (!this.moviesFilter && this.paginationMovies) {
      this.moviesFilter = this.paginationMovies.content;
    } else if (this.paginationMovies && this.moviesFilter) {
      this.paginationMovies.content = this.moviesFilter;
    }

    if (this.paginationMovies && this.moviesFilter) {
      this.paginationMovies.content = this.paginationMovies.content.filter(
        (filter) => {
          return (
            filter.winner.toString() === this.inputWinner ||
            this.inputWinner === 'default'
          );
        }
      );

      console.log(this.paginationMovies.content);
    }
  }

  async presentAlertStudios(studios: string[]) {
    let studiosDescription = '';
    studios.forEach((studio) => {
      studiosDescription = studiosDescription.concat(studio.concat(', '));
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
    let producersDescription = '';
    producers.forEach((producers) => {
      producersDescription = producersDescription.concat(
        producers.concat(', ')
      );
    });
    producersDescription = producersDescription.slice(0, -2);

    const alert = await this.alertController.create({
      header: 'Produtores',
      message: producersDescription,
      buttons: ['Fechar'],
    });

    await alert.present();
  }

  clearFilter() {
    const startPage = 0;
    const startSize = 15;
    this.inputYear = undefined;
    this.inputWinner = 'default';
    this.paginationMovies = undefined;
    this.parametersFilter.page = startPage;
    this.pagenation = 0;
    this.parametersFilter.size = startSize;
    this.parametersFilter.year = undefined;
    this.getAllMovies();
  }
}
