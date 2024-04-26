import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { GifCardComponent } from '../../components/gif-card/gif-card.component';
import { GiphyService } from '../../services/giphy.service';
import { IGif } from '../../models/gif.model';

@Component({
  selector: 'app-emojis',
  standalone: true,
  imports: [CommonModule, GifCardComponent],
  templateUrl: './emojis.component.html',
  styleUrl: './emojis.component.scss',
  providers: [GiphyService],
})
export class EmojisComponent {
  giphyService = inject(GiphyService);

  stickers = signal<IGif[]>([]);

  ngOnInit() {
    this.getStickers();
  }

  getStickers() {
    this.giphyService.getTrendingStickers().subscribe((data) => {
      this.stickers.update((prev) => [...prev, ...data]);
    });
  }
}
