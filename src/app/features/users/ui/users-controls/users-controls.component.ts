import { User } from './../../api/types';
import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from '../../model/users.service';
import { NgFor, TitleCasePipe, NgClass } from '@angular/common';
import {
  MatButtonToggleChange,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, fromEvent, map, Subscription } from 'rxjs';

const DEBOUNCE_TIME = 300;

@Component({
  selector: 'app-users-controls',
  imports: [
    MatInputModule,
    MatButtonToggleModule,
    MatIconModule,
    MatButtonModule,
    NgFor,
    TitleCasePipe,
    NgClass,
  ],
  templateUrl: './users-controls.component.html',
  styleUrl: './users-controls.component.scss',
})
export class UsersControlsComponent implements OnInit, OnDestroy {
  userService = inject(UsersService);

  options = ['name', 'email'] as const;

  filterInput$?: Subscription;

  @ViewChild('filterInput', { static: true })
  filterInput: ElementRef<HTMLInputElement> | undefined;

  isUpSortIconClassName(option: 'name' | 'email') {
    const { name, type } = this.userService.sortData;
    return option === name && type === 'up';
  }

  changeFilterName(e: MatButtonToggleChange) {
    this.userService.setFilterName(e.value);
  }

  ngOnInit() {
    this.filterInput$ = fromEvent(this.filterInput!.nativeElement, 'input')
      .pipe(
        debounceTime(DEBOUNCE_TIME),
        map((event: Event) => (event.target as HTMLInputElement).value)
      )
      .subscribe((val) => this.userService.setFilterValue(val));
  }

  ngOnDestroy() {
    this.filterInput$?.unsubscribe();
  }
}
