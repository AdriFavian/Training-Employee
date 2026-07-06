import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
  employeeForm!: FormGroup;
  isEditMode: boolean = false;
  private routeSub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();

    this.routeSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkEditMode();
    });
  }

  initForm(): void {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,13}$')]],
      department: ['', Validators.required],
      position: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]]
    });
  }

  checkEditMode(): void {
    const editId = this.employeeService.editingEmployeeId;
    if (this.router.url.includes('/add-employee')) {
      this.isEditMode = false;
      this.employeeService.editingEmployeeId = null;
      if (this.employeeForm) {
        this.employeeForm.reset();
      }
    } else if (editId !== null) {
      const emp = this.employeeService.getEmployeeById(editId);
      if (emp) {
        this.isEditMode = true;
        this.employeeForm.patchValue(emp);
      }
    } else if (editId === null && this.router.url.includes('/edit-employee')) {
      this.router.navigate(['/employees']);
    }
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      if (this.isEditMode) {
        const updatedEmployee = {
          id: this.employeeService.editingEmployeeId!,
          ...this.employeeForm.value,
          joinDate: new Date() 
        };
        this.employeeService.updateEmployee(updatedEmployee);
        alert('Data karyawan berhasil diperbarui!');
      } else {
        const newEmployee = {
          id: Date.now(),
          ...this.employeeForm.value,
          joinDate: new Date()
        };
        this.employeeService.addEmployee(newEmployee);
        alert('Karyawan berhasil ditambahkan!');
      }

      this.resetForm();
    }
  }

  resetForm(): void {
    this.isEditMode = false;
    this.employeeService.editingEmployeeId = null;
    this.employeeForm.reset();
    this.router.navigate(['/employees']);
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}