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
  public inputYear = '';
  public inputWinner: string = 'default';
  public paginationMovies: PaginationMovies | undefined;
  public moviesFilter: Movies[] | undefined;
  public items: number[] = [];
  public pagenation = 0;
  public optionsWiner: string[] = ['Yes', 'No'];
  private parametersFilter: ParametersFilter = {};
  private maxPage = 10;
  private startPage = 0;
  private totalPages = 0;
  private currentPage = 0;

  constructor(
    private raspberryService: RaspberryService<PaginationMovies>,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.parametersFilter.page = this.startPage;
    this.parametersFilter.size = this.maxPage;
    this.parametersFilter.year = undefined;
    this.getServiceMovies();
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    this.pagenation = this.pagenation + 1;
    this.parametersFilter.page = this.pagenation;
    if(this.currentPage < this.totalPages) {
      this.getServiceMovies();
    }
  
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 100);
  }

  filterYear() {
    this.isWinner(); 
    if (this.inputYear.length >= 4) {
      this.paginationMovies = undefined;
      this.parametersFilter.page = this.startPage;
      this.parametersFilter.year = Number(this.inputYear);
      this.parametersFilter.size = this.maxPage;                 
      this.getServiceMovies();      
    }    
  }

  public isWinner() {
    switch (this.inputWinner) {
      case "true": {
        this.parametersFilter.winner = true;
        break;
      }
      case "false": {
        this.parametersFilter.winner = false;
        break;
      }
      default: {
        this.parametersFilter.winner = undefined;
        break;
      }
    }
  }

  public filterWinner() {
    this.parametersFilter.page = this.startPage;
    this.parametersFilter.size = this.maxPage;
    this.isWinner();       
    this.paginationMovies = undefined;
    this.pagenation = 0;
    this.currentPage = 0
    this.getServiceMovies();     
  }

  private getServiceMovies() {
    this.raspberryService
      .getMovies('', this.parametersFilter)
      .subscribe((result) => {
        this.totalPages = result.totalPages;
        this.currentPage = result.number;
        if (this.paginationMovies) {
          this.paginationMovies.content = this.paginationMovies.content.concat(
            result.content
          );
        } else {
          this.paginationMovies = result;
        }        

      });
  }

  async presentAlertStudios(studios: string[]) {
    let studiosDescription = '';
    studios.forEach((studio) => {
      studiosDescription = studiosDescription.concat(studio.concat(', '));
    });
    studiosDescription = studiosDescription.slice(0, -2);

    const alert = await this.alertController.create({
      header: 'Estudios',
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
    this.clearParameters();
    this.getServiceMovies();
  }

  public clearParameters() {
    this.inputYear = '';
    this.inputWinner = 'default'
    this.paginationMovies = undefined;
    this.parametersFilter.page = this.startPage;
    this.pagenation = 0;
    this.currentPage = 0
    this.parametersFilter.size = this.maxPage;
    this.parametersFilter.winner = undefined;
    this.parametersFilter.year = undefined;
  }
}
