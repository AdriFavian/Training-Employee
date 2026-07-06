// mengisi service with dummy data JSON

import { Injectable } from '@angular/core';
import { Employee } from 'src/app/models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  // data dummy internal array JSON
  private dummyEmployees: Employee[] = [
    {
      id: 1,
      name: 'Muhammad Farhan',
      email: 'farhan@company.com',
      phone: '081234567890',
      department: 'IT',
      position: 'Frontend Developer',
      joinDate: new Date('2024-01-15'),
      salary: 8500000,
    },
    {
      id: 2,
      name: 'Siti Rahma',
      email: 'siti.rahma@company.com',
      phone: '082198765432',
      department: 'HR',
      position: 'HR Specialist',
      joinDate: new Date('2023-05-20'),
      salary: 7000000,
    },
    {
      id: 3,
      name: 'Budi Santoso',
      email: 'budi.s@company.com',
      phone: '085711223344',
      department: 'Finance',
      position: 'Accountant',
      joinDate: new Date('2025-02-10'),
      salary: 7500000,
    },
  ];

  constructor() {}

  getEmployees(): Employee[] {
    return this.dummyEmployees;
  }

  deleteEmployee(id: number): void {
    this.dummyEmployees = this.dummyEmployees.filter((emp) => emp.id !== id);
  }

  addEmployee(employee: Employee): void {
    this.dummyEmployees.push(employee);
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.dummyEmployees.find((emp) => emp.id === id);
  }
  updateEmployee(updatedEmployee: Employee): void {
    const index = this.dummyEmployees.findIndex(
      (emp) => emp.id === updatedEmployee.id,
    );
    if (index !== -1) {
      this.dummyEmployees[index] = {
        ...this.dummyEmployees[index],
        ...updatedEmployee,
      };
    }
  }

  editingEmployeeId: number | null = null;
}
