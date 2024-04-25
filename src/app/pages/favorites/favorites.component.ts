import { Component, signal } from '@angular/core';
import { GifCardComponent } from '../../components/gif-card/gif-card.component';
import { CommonModule } from '@angular/common';
import { IGif } from '../../models/gif.model';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, GifCardComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  favorite_gifs = signal<IGif[]>([]);

  ngOnInit() {
    this.getFavoriteGifs();
  }

  getFavoriteGifs() {
    const favorite_gifs = JSON.parse(
      window.localStorage.getItem('favorite_gifs') ?? "[]"
    );

    if(!favorite_gifs || !Array.isArray(favorite_gifs)) return;

    this.favorite_gifs.set(favorite_gifs);
  }
}
