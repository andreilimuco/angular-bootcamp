import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInformation } from 'src/app/models/user.information.model';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeInfo } from 'src/app/models/employee.information.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseURL: string = 'https://reqres.in/api/users';

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<any> {
    console.log('get users');
    return this.httpClient.get<any>(this.baseURL);
  }

  // getUsersWParams(): Observable<any>{
  //   console.log('get users w params');
  //   let queryParams = new HttpParams();
  //   queryParams = queryParams.append("page", 1)
  //   queryParams = queryParams.append("per_page", 1)

  //   return this.httpClient.get<any>(this.baseURL, {params: queryParams});
  // }

  getTypedUsers(): Observable<UserInformation> {
    console.log('get users: typed');
    return this.httpClient.get<UserInformation>(this.baseURL);
  }

  public saveEmployee(employee: Employee): Observable<any> {
    return this.httpClient.post<any>(this.baseURL, employee);
  }

  public saveEmployeeTyped(employee: Employee): Observable<EmployeeInfo> {
    return this.httpClient.post<EmployeeInfo>(this.baseURL, employee);
  }


}
