import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../api/types';

@Component({
  selector: 'app-user-item',
  imports: [MatCardModule],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.scss',
})
export class UserItemComponent {
  @Input() user!: User;
}
