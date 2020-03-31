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
import { AuthenticateService } from '../services/authentication.service';
import { NavController, ModalController } from '@ionic/angular';

import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { WeekDay } from '@angular/common';

import { Frigo } from '../../models/frigo';
import { FrigoService } from '../services/frigo.service';

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
	
	private frigos: Frigo[];
  
	modalData: {
		action: string;
		event: CalendarEvent;
	};
  
	actions: CalendarEventAction[] = [];
  
	refresh: Subject<any> = new Subject();
  
	events: CalendarEvent[];
  
	activeDayIsOpen: boolean = true;

	constructor(
		private authService: AuthenticateService,
		private frigoService: FrigoService,
		private navCtrl: NavController,
	) {}

	async ionViewDidEnter() {
		console.log("DidEnter");
		await this.getDate();
		console.log("After did enter");
		console.log(this.events);
	}

	ngOnInit(){
		this.getDate();
	}

	async getDate() {
		this.frigos = await this.frigoService.getProductByDay();
		
		this.events = this.frigos.map((item) => {
			let expireDateObj = new Date(parseFloat(item.expired_date) * 1000);
			return {
				start: expireDateObj,
				end: expireDateObj,
				title: item.title,
				color: colors.blue,
				allDay: true,
			}
			
		});


	}

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
