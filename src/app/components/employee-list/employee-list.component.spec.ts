import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule], // Wajib memasukkan CommonModule agar bisa menggunakan directive bawaan Angular nanti
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  // array data karyawan
  employees: Employee[] = [];

  // Inject EmployeeService ke dalam komponen melalui constructor
  constructor(private employeeService: EmployeeService) {}

  //   berjalan otomatis saat komponen pertama kali muncul
  ngOnInit(): void {
    this.loadEmployees();
  }

  //  mengambil data dari service dan memasukkan ke variabel lokal
  loadEmployees(): void {
    this.employees = this.employeeService.getEmployees();
  }
}