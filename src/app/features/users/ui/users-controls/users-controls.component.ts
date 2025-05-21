import { NgClass, NgFor, TitleCasePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatButtonToggleChange,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, fromEvent, map, Subscription } from 'rxjs';
import { UsersService } from '../../model/users.service';

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
    const name = this.userService.sortName;
    const type = this.userService.sortType;

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
