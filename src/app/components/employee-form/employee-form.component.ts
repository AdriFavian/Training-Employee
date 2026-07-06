import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  @Output() formReset = new EventEmitter<void>();
  employeeForm!: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
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
    if (editId !== null && !this.isEditMode) {
      const emp = this.employeeService.getEmployeeById(editId);
      if (emp) {
        this.isEditMode = true;
        this.employeeForm.patchValue(emp);
      }
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
    this.formReset.emit();
  }
}