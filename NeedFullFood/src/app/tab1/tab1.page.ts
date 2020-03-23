import { Component } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  view: CalendarView = CalendarView.Day;
	CalendarView = CalendarView;
	viewDate: Date = new Date();

  constructor() {}

}
