import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';	

import {
	startOfDay,
	endOfDay,
	subDays,
	addDays,
	endOfMonth,
	isSameDay,
	isSameMonth,
	addHours
} from 'date-fns';

import { Subject } from 'rxjs';

import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { WeekDay } from '@angular/common';

const colors: any = {
	blue: {
	  primary: '#0278C2',
	  secondary: '#0AA7A3'
	},
	green: {
	  primary: '#0BBB8D',
	  secondary: '#03D977'
	},
	gray: {
	  primary: '#D9D7D8'
	}
  };


@Component({
	selector: 'app-tab3',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: 'tab3.page.html',
	styleUrls: ['tab3.page.scss']	
})
export class Tab3Page {

	view: CalendarView = CalendarView.Month;
	CalendarView = CalendarView;
	viewDate: Date = new Date();
  
	modalData: {
		action: string;
		event: CalendarEvent;
	};
  
	actions: CalendarEventAction[] = [];
  
	refresh: Subject<any> = new Subject();
  
	events: CalendarEvent[] = [
	  {
		start: subDays(startOfDay(new Date()), 1),
		end: addDays(new Date(), 1),
		title: 'A 3 day event',
		color: colors.blue,
		allDay: true,
	  },
	  {
		start: startOfDay(new Date()),
		title: 'An event with no end date',
		color: colors.green,
		actions: this.actions
	  },
	  {
		start: subDays(endOfMonth(new Date()), 3),
		end: addDays(endOfMonth(new Date()), 3),
		title: 'A long event that spans 2 months',
		color: colors.gray,
		allDay: true
	  },
	  {
		start: addHours(startOfDay(new Date()), 2),
		end: addHours(new Date(), 2),
		title: 'A draggable and resizable event',
		color: colors.green,
		actions: this.actions,
		resizable: {
		  beforeStart: true,
		  afterEnd: true
		},
		draggable: true
	  }
	];
  
	activeDayIsOpen: boolean = true;

	constructor() {}

  
	dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
		if (isSameMonth(date, this.viewDate)) {
		  if (
			(isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
			events.length === 0
		  ) {
			this.activeDayIsOpen = false;
		  } else {
			this.activeDayIsOpen = true;
		  }
		  this.viewDate = date;
		}
	  }
	
	  eventTimesChanged({
		event,
		newStart,
		newEnd
	  }: CalendarEventTimesChangedEvent): void {
		this.events = this.events.map(iEvent => {
		  if (iEvent === event) {
			return {
			  ...event,
			  start: newStart,
			  end: newEnd
			};
		  }
		  return iEvent;
		});
		this.handleEvent('Dropped or resized', event);
	  }
	
	  handleEvent(action: string, event: CalendarEvent): void {
		this.modalData = { event, action };
	  }
	
	  addEvent(): void {
		this.events = [
		  ...this.events,
		  {
			title: 'New event',
			start: startOfDay(new Date()),
			end: endOfDay(new Date()),
			color: colors.red,
			draggable: true,
			resizable: {
			  beforeStart: true,
			  afterEnd: true
			}
		  }
		];
	  }
	
	  deleteEvent(eventToDelete: CalendarEvent) {
		this.events = this.events.filter(event => event !== eventToDelete);
	  }
	
	  setView(view: CalendarView) {
		this.view = view;
	  }
	
	  closeOpenMonthViewDay() {
		this.activeDayIsOpen = false;
	  }

}
