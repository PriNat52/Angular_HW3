import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map,tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=';

  private booklist: object[] = [];
  private booksbj$ = new Subject();
  booklist$ = this.booksbj$.asObservable();

  private wishlist: object[] = [];
  private wishsbj$ = new Subject();
  wishlist$ = this.wishsbj$.asObservable();

  constructor(private http: HttpClient) { }

  addToList(id: string){
    const book = this.booklist.find((book: any) => book.id === id);
    const bookIwished = this.wishlist.find((book: any) => book.id === id);

    if(!book || bookIwished) return;

    this.wishlist = [...this.wishlist, book];
    this.wishsbj$.next(this.wishlist);
  }

  deleteFromList(id: string){
    this.wishlist = this.wishlist.filter((book: any) => book.id !== id);
    this.wishsbj$.next(this.wishlist);
  }

  getBooks(keyword: string) {
    this.http.get([this.baseUrl, keyword].join(''))
      .pipe(
        map((bookobj: any)=>{
          const arr = bookobj.items.map((obj: any) => {
            return {
              id: obj.id,
              bookname: obj.volumeInfo.title,
              publisher: obj.volumeInfo.publisher,
              date: obj.volumeInfo.publishedDate,
              description: obj.volumeInfo.description,
              thumbnail: obj.volumeInfo.imageLinks.thumbnail,
            };
          });
          return arr;
        }),
        tap((booklist) => {
          this.booklist = [...booklist];
          this.booksbj$.next(this.booklist);
        })
        )
      .subscribe(console.log);
  }

  
}
