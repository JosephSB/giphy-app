import { Component, inject, signal } from '@angular/core';
import { IGif } from '../../models/gif.model';
import { GiphyService } from '../../services/giphy.service';
import { CommonModule } from '@angular/common';
import { GifCardComponent } from '../../components/gif-card/gif-card.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    GifCardComponent,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [GiphyService],
})
export class HomeComponent {
  giphyService = inject(GiphyService);

  loader_gifs = signal(true);
  loader_tags = signal(true);
  gifs = signal<IGif[]>([]);
  tags = signal<string[]>([]);

  inputSearchCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern('^\\S.*$'),
      Validators.minLength(3),
    ],
  });

  ngOnInit() {
    this.getGifs();
    this.getTrendingTags();
  }

  getGifs() {
    this.loader_gifs.set(true);
    this.giphyService.getTrendingGifs().subscribe((data) => {
      this.gifs.update((prev) => [...prev, ...data]);
      this.loader_gifs.set(false);
    });
  }

  getTrendingTags() {
    this.loader_tags.set(true);
    this.giphyService.getTrendingTags().subscribe((data) => {
      this.tags.set(data);
      this.loader_tags.set(false);
    });
  }

  searchTerm(value: string) {
    this.loader_gifs.set(true);
    this.giphyService.searchGif(value).subscribe((data) => {
      this.gifs.set(data);
      this.loader_gifs.set(false);
    });
  }

  searchGif(e: Event) {
    this.loader_gifs.set(true);
    const input = e.target as HTMLInputElement;
    this.giphyService.searchGif(input.value).subscribe((data) => {
      this.gifs.set(data);
      this.loader_gifs.set(false);
    });
  }

  cleanInputSearch() {
    this.inputSearchCtrl.setValue('');
    this.gifs.set([]);
    this.getGifs();
  }
}
