import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.page';

import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { MovieWinnerYearComponent } from './movie-winner-year/movie-winner-year/movie-winner-year.component';
import { MultipleWinnersComponent } from './multiple-winners/multiple-winners/multiple-winners.component';
import { MaxMinWinComponent } from './max-min-win/max-min-win/max-min-win.component';
import { StudiosComponent } from './studios/studios/studios.component';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, DashboardPageRoutingModule],
  declarations: [DashboardComponent, MovieWinnerYearComponent, MultipleWinnersComponent, MaxMinWinComponent, StudiosComponent],
})
export class DashboardPageModule {}
