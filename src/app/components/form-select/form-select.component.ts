import {  Component, Input, OnInit } from '@angular/core';
import { HelpersService } from '../../_services/helpers.service';

@Component({
  selector: 'form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
})
export class FormSelectComponent implements OnInit {
  @Input() label = '';
  @Input() itemText = 'text';
  @Input() itemValue = 'value';
  @Input() type = 'text' as string;
  @Input() control = {
    errors: {} as any,
  } as any;
  @Input() field;
  @Input() error = '' as string;
  @Input() items = [] as Array<any>;

  selectedItem = { text: '' } as any;
  showItems = false as boolean;

  constructor(public helpers: HelpersService) { }

  ngOnInit(): void {
    this.control.valueChanges.subscribe((value: number) => {
      if (value) {
        console.log(value);

        this.selectedItem = this.items.find((item: any) => item.value === this.control.value);
      }
    });
  }

  showErrors(): boolean {
    return (
      !!this.helpers.getErrors(this.error, this.control) &&
      this.control.touched &&
      this.control.invalid
    );
  }

  selectItem(item: any): void {
    this.selectedItem = item;
    this.control.setValue(this.selectedItem[this.itemValue]);
    this.toggle();
  }

  toggle(): void {
    this.showItems = !this.showItems;
  }
}
