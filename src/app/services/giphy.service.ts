import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import config from '../config';
import { Observable, map } from 'rxjs';
import { IGif } from '../models/gif.model';

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  private http = inject(HttpClient);

  private url: string;

  constructor() {
    this.url = config.URL_API;
  }

  getTrendingGifs(page: number = 1, size: number = 20): Observable<IGif[]> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .get<{ data: any[] }>(this.url + 'gifs/trending', {
        headers: headers,
        params: {
          api_key: config.API_KEY,
          limit: size.toString(),
          offset: ((page - 1) * size).toString(),
          //rating: 'g',
          //bundle: 'messaging_non_clips',
        },
      })
      .pipe(map((res) => res.data));
  }

  getTrendingTags(): Observable<string[]> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .get<{ data: any[] }>(this.url + 'trending/searches', {
        headers: headers,
        params: {
          api_key: config.API_KEY,
        },
      })
      .pipe(map((res) => res.data));
  }

  getTrendingStickers(page: number = 1, size: number = 20): Observable<IGif[]> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .get<{ data: any[] }>(this.url + 'stickers/trending', {
        headers: headers,
        params: {
          api_key: config.API_KEY,
          limit: size.toString(),
          offset: ((page - 1) * size).toString(),
          //rating: 'g',
          //bundle: 'messaging_non_clips',
        },
      })
      .pipe(map((res) => res.data));
  }
}
