import { Component, Input, OnInit } from '@angular/core';
import moment from 'moment';
import { HelpersService } from '../../../_services/helpers.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  @Input() icon = '';
  @Input() label = '';
  @Input() control = {
    errors: {} as any,
  } as any;
  @Input() field;
  @Input() error = '' as string;
  calendar = [];
  show = false as boolean;

  currentDate = moment();

  constructor(public helpers: HelpersService) {}

  ngOnInit(): void {
    this.setDays();
  }

  setDays(): void {
    this.calendar = [];
    const date = moment(this.currentDate);

    const startDay = date.startOf('month').days();
    const endDay = date.endOf('month').days();
    const days = date.daysInMonth();

    for (let i = 1; i <= days; i++) {
      const newDate = moment(this.currentDate).set('date', i);
      this.calendar.push(newDate);
    }

    const oldMonth = moment(this.currentDate).subtract(1, 'month');
    const prevMonthDays = oldMonth.daysInMonth();

    for (let day = 0; day < startDay; day++) {
      const oldDay = oldMonth.set('date', prevMonthDays - day);
      this.calendar.unshift(moment(oldDay));
    }

    const nextMont = moment(this.currentDate).add(1, 'month');

    for (let day = 1; day <= 7 - endDay - 1; day++) {
      const nextDay = nextMont.set('date', day);
      this.calendar.push(moment(nextDay));
    }
  }

  changeMonth(value): void {
    this.currentDate = moment(this.currentDate).add('months', value);
    this.setDays();
  }

  selectDate(date): void {
    this.currentDate = date;
  }

  notCurrentMonthDay(date): boolean {
    return !date.isSame(this.currentDate, 'month');
  }

  isCurrentDate(date: Date): boolean {
    return this.currentDate.isSame(date, 'day');
  }

  showErrors(): boolean {
    return (
      !!this.helpers.getErrors(this.error, this.control) &&
      this.control.touched &&
      this.control.invalid
    );
  }
}
