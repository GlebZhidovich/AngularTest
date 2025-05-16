import { Component } from '@angular/core';
import { UsersListComponent } from './features/users/ui/users-list/users-list.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  imports: [UsersListComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
