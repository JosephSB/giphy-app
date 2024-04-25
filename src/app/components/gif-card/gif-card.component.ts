import { Component, Input } from '@angular/core';
import { IGif } from '../../models/gif.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gif-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gif-card.component.html',
  styleUrl: './gif-card.component.scss'
})
export class GifCardComponent {
  @Input() gif: IGif = {} as IGif;


  isFavorite(gif_id: string) {
    const favorite_gifs = JSON.parse(
      window.localStorage.getItem('favorite_gifs') ?? "[]"
    );

    if(!favorite_gifs || !Array.isArray(favorite_gifs)) return false;

    const index = favorite_gifs.findIndex((x: IGif) => x.id === gif_id);

    if (index === -1) return false
    return true
  }

  handleGiftFavoriteInLocalStorage(gif: IGif) {
    const favorite_gifs = JSON.parse(
      window.localStorage.getItem('favorite_gifs') ?? "[]"
    );

    if(!favorite_gifs || !Array.isArray(favorite_gifs)) return;

    const index = favorite_gifs.findIndex((x: IGif) => x.id === gif.id);

    if (index === -1) {
      const newList = [...favorite_gifs, gif];
      window.localStorage.setItem('favorite_gifs', JSON.stringify(newList));
      return;
    }

    const listFilter = [...favorite_gifs].filter((x: IGif) => x.id !== gif.id);
    window.localStorage.setItem('favorite_gifs', JSON.stringify(listFilter));
  }
}
