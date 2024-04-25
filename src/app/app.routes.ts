import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { EmojisComponent } from './pages/emojis/emojis.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'favoritos',
    component: FavoritesComponent,
  },
  {
    path: 'emojis',
    component: EmojisComponent,
  }
];
