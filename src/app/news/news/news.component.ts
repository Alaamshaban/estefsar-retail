import { Component, OnInit } from '@angular/core';
import { NewsModel } from 'src/app/shared/models/news.model';
import { NewsService } from 'src/app/shared/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  constructor(private newsService: NewsService) { }
  news: NewsModel[];
  ngOnInit(): void {
    this.newsService.getNews().subscribe(res => {
      console.log(res);
      this.news = res;
    });
  }

}
