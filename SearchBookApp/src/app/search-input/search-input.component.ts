import { Component, ElementRef, OnInit, VERSION, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookService } from '../services/book.service';

import { fromEvent } from 'rxjs';
import { debounceTime, map, filter, mergeMap, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {

  baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
  @ViewChild('inputbox', { static: true })
  inputbox!: ElementRef;

  public answer!: any;

  constructor(private bookService: BookService, private http: HttpClient) { }

  ngOnInit(): void {
    fromEvent(this.inputbox.nativeElement, 'keyup')
      .pipe(debounceTime(600),
        filter((_) => {
          const keyword = this.inputbox.nativeElement.value;
          return keyword.trim();
        }),
        tap((_) => {
          const keyword = this.inputbox.nativeElement.value.trim();
          this.bookService.getBooks(keyword);
        })
      )
      .subscribe();
  }

}
