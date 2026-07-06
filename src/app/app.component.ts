import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    EmployeeListComponent,
    EmployeeFormComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Training-Employee';
  activeTab: 'dashboard' | 'add' = 'dashboard';

  setTab(tab: 'dashboard' | 'add'): void {
    this.activeTab = tab;
  }
}