import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetUser } from './store/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store) { }
  title = 'estafsar-retail';
  ngOnInit(): void {}
}
