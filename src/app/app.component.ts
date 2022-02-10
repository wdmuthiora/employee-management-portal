import { HttpErrorResponse } from '@angular/common/http';
import { BuiltinFunctionCall } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'employeemanagerapp';

  public employees!: Employee[];
  public editEmployee!: Employee;
  public employee?: Employee;
  public deleteEmployee?: Employee;

  constructor(private employeeService: EmployeeService) {}

  // run on initialization of this component
  ngOnInit(): void {
    this.getEmployees();
  }

  //fetch all existing employees
  public getEmployees() {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // open modals
  public onOpenModal(employee: Employee | any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');

    button.type = 'button'; //default type for button is submit.
    button.style.display = 'none';

    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }

    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }

    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }

    container?.appendChild(button);
    button.click();
  }

  // add employee
  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('close-button')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // edit employee
  public onEditEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //delete employee
  public onDeleteEmployee(employeeId: number): void {
    document.getElementById('confirm-delete-button')?.click();
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
