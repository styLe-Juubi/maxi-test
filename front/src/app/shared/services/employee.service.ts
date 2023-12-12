import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { CreateEmployeeModel } from 'src/app/store/dashboard/models/create-employee.model';
import { EmployeeModel } from 'src/app/store/dashboard/models/employee.model';
import { PaginationResponseModel } from '../models/pagination-response.model';
import { AuthService } from './auth.service';


@Injectable()
export class EmployeeService {

    protected api: string = environment.api;
    protected version: string = environment.version;
    protected apiUrl: string = `${ this.api }/${ this.version }`;

    constructor(
        private readonly http: HttpClient,
        private readonly authService: AuthService,
    ) {}

    public create( form: CreateEmployeeModel ): Observable<EmployeeModel> {
        return this.http.post<EmployeeModel>(`${ this.apiUrl }/employee`, form, this.getHeaders() );
    }

    public findAll(
        queryParams?: any
    ): Observable<PaginationResponseModel<EmployeeModel>> {
        
        return this.http.get<PaginationResponseModel<EmployeeModel>>(
            `${ this.apiUrl }/employee${ 
                ( queryParams ) && '?' + this.createQueryString( queryParams )
            }`, 
            this.getHeaders(),
        );
    }

    public findOne( id: string ): Observable<EmployeeModel> {
        return this.http.get<EmployeeModel>(`${ this.apiUrl }/employee/${ id }`, this.getHeaders() );
    }

    public update( id: string, obj: any ): Observable<EmployeeModel> {
        
        return this.http
            .patch<EmployeeModel>( `${ this.apiUrl }/employee/${ id }`, obj, this.getHeaders() );
    }

    public delete( id: string ): Observable<EmployeeModel> {
        
        return this.http
            .delete<EmployeeModel>( `${ this.apiUrl }/employee/${ id }`, this.getHeaders() );
    }

    /*********************************************************************** */

    protected createQueryString( data: any ): string {
        return Object.keys(data).map(key => {
          let val = data[key]
          if (val !== null && typeof val === 'object') val = this.createQueryString(val)
          return `${key}=${encodeURIComponent(`${val}`.replace(/\s/g, '_'))}`
        }).join('&');
    }

    protected getHeaders() {
        return {
            headers: {
                'Authorization': `Bearer ${ this.authService.getToken() }`,
            } 
        }
    }
}