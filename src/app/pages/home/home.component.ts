import { Component, inject, signal } from '@angular/core';
import { IGif } from '../../models/gif.model';
import { GiphyService } from '../../services/giphy.service';
import { CommonModule } from '@angular/common';
import { GifCardComponent } from '../../components/gif-card/gif-card.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GifCardComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [GiphyService],
})
export class HomeComponent {
  giphyService = inject(GiphyService);

  gifs = signal<IGif[]>([]);
  tags = signal<string[]>([]);

  inputSearchCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern('^\\S.*$'),
      Validators.minLength(3),
    ]
  });

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

  searchTerm(value: string) {
    this.giphyService.searchGif(value).subscribe((data) => {
      this.gifs.set(data);
    });
  }

  searchGif(e: Event) {
    const input = e.target as HTMLInputElement;
    this.giphyService.searchGif(input.value).subscribe((data) => {
      this.gifs.set(data);
    });
  }

  cleanInputSearch() {
    this.inputSearchCtrl.setValue("");
    this.gifs.set([]);
    this.getGifs();
  }
}
