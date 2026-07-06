import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  // 1. Definisikan variabel properti penampung data untuk HTML
  employees: Employee[] = [];
  searchTerm: string = '';

  // menyimpan status filter dan sort
  selectedDepartment: string = '';
  sortBy: string = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Pagination states
  currentPage: number = 1;
  itemsPerPage: number = 5;

  // 2. Inject service ke dalam komponen
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  // 3. Jalankan logika saat komponen pertama kali dimuat
  ngOnInit(): void {
    this.loadEmployees();
  }

  // 4. Ambil data dari service
  loadEmployees(): void {
    this.employees = this.employeeService.getEmployees();
  }

  // Handle Search, Filter, dan Sort
  get filteredEmployees(): Employee[] {
    // Proses Pencarian Nama & Filter Departemen
    let result = this.employees.filter((emp) => {
      const matchName = emp.name
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      const matchDept =
        this.selectedDepartment === '' ||
        emp.department === this.selectedDepartment;
      return matchName && matchDept;
    });

    // Proses Sorting
    result.sort((a, b) => {
      let comparison = 0;

      if (this.sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (this.sortBy === 'salary') {
        comparison = a.salary - b.salary;
      }

      return this.sortDirection === 'asc' ? comparison : -comparison;
    });

    return result;
  }

  get pagedEmployees(): Employee[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredEmployees.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  get currentEndIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredEmployees.length);
  }

  toggleSortDirection(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }

  onFilterChange(): void {
    this.currentPage = 1;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get totalSalary(): number {
    return this.employees.reduce((sum, emp) => sum + emp.salary, 0);
  }

  get averageSalary(): number {
    return this.employees.length > 0 ? this.totalSalary / this.employees.length : 0;
  }

  getDeptCount(dept: string): number {
    return this.employees.filter((emp) => emp.department === dept).length;
  }

  deleteEmployee(id: number, name: string): void {
    const confirmDelete = confirm(
      `Apakah Anda yakin ingin menghapus karyawan "${name}"?`,
    );

    if (confirmDelete) {
      // Panggil fungsi hapus di service
      this.employeeService.deleteEmployee(id);
      this.loadEmployees();
    }
  }

  editEmployee(id: number): void {
    this.employeeService.editingEmployeeId = id;
    this.router.navigate(['/edit-employee']);
  }
}
