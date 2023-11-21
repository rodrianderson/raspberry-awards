import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MoviesPageRoutingModule } from './movies-routing.module';
import { RaspberryService } from '../services/raspberry.service';
import { MoviesComponent } from './movies.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MoviesPageRoutingModule
  ],
  declarations: [MoviesComponent],
  providers: [RaspberryService]
})
export class MoviesPageModule {}
