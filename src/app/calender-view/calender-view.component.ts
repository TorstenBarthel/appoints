import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
// import { EventColor } from 'calendar-utils';

import { select, Store } from '@ngrx/store'
import { State } from './reducers/calender.reducer'
import { loadCalenders } from './actions/calender.actions';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators'

import { getAllAppointments, getAppointmentsLoading } from './selectors/calender.selectors';

import { colors } from './calender.service'

@Component({
  selector: 'app-calender-view',
  templateUrl: './calender-view.component.html',
  styleUrls: ['./calender-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalenderViewComponent implements OnInit {

  view: CalendarView = CalendarView.Week;

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  viewDate: Date = new Date();

  locale = 'de'

  eventsData: CalendarEvent

  appointments$: Observable<Array<any>>
  appointments: Array<any>

  loading$: Observable<boolean>

  constructor(private modal: NgbModal, private store: Store<State>) {}

  ngOnInit(): void {
    // this.appointments$ = this.store.pipe(select(getAllAppointments))
    this.loading$ = this.store.pipe(select(getAppointmentsLoading))

    this.store.pipe(
       
      select(getAllAppointments)).subscribe(res => {
        console.log('res:: ', res )

        this.appointments = res
    })

    this.store.dispatch(loadCalenders())
  }

  onHourClick($event: CalendarEvent): void {
    console.log('hour-click:: ', $event)

    this.openModal($event)
  }

  private openModal($event: CalendarEvent): void {
        
    this.eventsData = $event;
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  changeViewDate($event: any): void {
    console.log('new-view-date:: ', $event)

    this.viewDate = new Date($event)
  }

  /* @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  // new
  eventsData: Array<any> = []

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: { ...colors.red },
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: { ...colors.yellow },
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: { ...colors.blue },
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: { ...colors.yellow },
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal) {}

  ngOnInit(): void {

  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {

        console.log(events)

        // this.activeDayIsOpen = false;
      } else {
        // this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  // new
  openModal(event: CalendarEvent): void {
    
    console.log(event)
    
    // this.eventsData = event;
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
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
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  } */
}

/*
import {
  Component, OnInit, ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';

import { Store } from '@ngrx/store'
// root state:
import { State } from '../reducers'

import { loadCalenders } from './actions/calender.actions';

import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';
import { colors } from '../calendar-utils/colors';

@Component({
  selector: 'app-calender-view',
  templateUrl: './calender-view.component.html',
  styleUrls: ['./calender-view.component.scss']
})
export class CalenderViewComponent implements OnInit {

  

  view: CalendarView = CalendarView.Month;

  viewDate = new Date();

  // events: CalendarEvent[] = [];

  refresh = new Subject<void>();



  events: CalendarEvent[] = [
    {
      title: 'Click me',
      color: colors.yellow,
      start: new Date(),
    },
    {
      title: 'Or click me',
      color: colors.blue,
      start: new Date(),
    },
  ];



  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.store.dispatch(loadCalenders())
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }

  // addEvent(date: Date): void {
  //   this.events.push({
  //     start: date,
  //     title: 'New event',
  //     color: colors.red,
  //   });
  //   this.refresh.next();
  // }

  // deleteEvent($event:CalendarEvent): void {
  //   console.log('delete event')
  // }



}
*/
