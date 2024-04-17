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
}
