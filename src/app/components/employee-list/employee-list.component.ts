import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  // 1. Definisikan variabel properti penampung data untuk HTML
  employees: Employee[] = [];

  // 2. Inject service ke dalam komponen
  constructor(private employeeService: EmployeeService) {}

  // 3. Jalankan logika saat komponen pertama kali dimuat
  ngOnInit(): void {
    this.loadEmployees();
  }

  // 4. Ambil data dari service
  loadEmployees(): void {
    this.employees = this.employeeService.getEmployees();
  }
}