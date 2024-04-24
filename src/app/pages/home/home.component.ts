import { Component, inject, signal } from '@angular/core';
import { IGif } from '../../models/gif.model';
import { GiphyService } from '../../services/giphy.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [GiphyService],
})
export class HomeComponent {
  giphyService = inject(GiphyService);

  gifs = signal<IGif[]>([]);
  tags = signal<string[]>([]);

  ngOnInit() {
    this.getGifs();
    this.getTrendingTags();
  }

  getGifs() {
    this.giphyService.getTrendingGifs().subscribe((data) => {
      this.gifs.update((prev) => [...prev, ...data]);
    });
  }

  getTrendingTags() {
    this.giphyService.getTrendingTags().subscribe((data) => {
      this.tags.set(data);
    });
  }

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
