import { HttpClient } from '@angular/common/http';
import { UserInformation } from './../../models/user.information.model';
import { EmployeeService } from '../../core/services/employee.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Employee } from 'src/app/models/employee.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeInfo } from 'src/app/models/employee.information.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  users = new Array<any>();
  userInfo: UserInformation;
  employee: Employee;
  employees: Employee[] = [];
  employeesTyped: EmployeeInfo[] = [];

  constructor(private employeeService: EmployeeService) {
    this.userInfo ={} as UserInformation;
    this.employee = {} as Employee;
  }
  ngOnInit(): void {
    //any response
    this.employeeService.getUsers().subscribe(res => {
      this.users = res.data;
    }, e => {
      console.log(e);
    })

    //typed response
    this.employeeService.getUsers().subscribe(response => {

    this.userInfo.page = response?.page;
    this.userInfo.per_page = response?.per_page;
    this.userInfo.total = response?.total;
    this.userInfo.total_pages = response?.total_pages;
    this.userInfo.data = response?.data?.map((item:User) => {

      var user = {} as User;
      user.avatar = item?.avatar;
      user.email = item?.email;
      user.first_name = item?.first_name;
      user.last_name = item?.last_name;
      user.id = item?.id;
      return user;
      });

      });

  }

  employeeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    job: new FormControl('', [Validators.required]),
  })

  saveEmployee() {
    this.employee = <Employee> this.employeeForm.value;
    this.employeeService.saveEmployee(this.employee).subscribe((response: any) => {
      console.log(response);
      this.employees.push({name: response.name, job: response.job})
    })
  }

  saveEmployeeTyped() {
    this.employee = <Employee> this.employeeForm.value;
    this.employeeService
      .saveEmployeeTyped(this.employee)
      .subscribe((response: EmployeeInfo) => {
        console.log(response);

        this.employees.push({name: response.name, job: response.job});
        this.employeesTyped.push({
          name: response.name,
          job: response.job,
          id: response.id,
          createdAt: response.createdAt,
        })
      })
  }


}
