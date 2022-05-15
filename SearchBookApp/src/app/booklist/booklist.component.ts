import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {

  booklist$: any;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.booklist$ = this.bookService.booklist$;
  }

  addToWish(id: string){
    this.bookService.addToList(id);
  }
}
