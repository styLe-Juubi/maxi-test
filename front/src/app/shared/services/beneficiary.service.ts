import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { PaginationResponseModel } from '../models/pagination-response.model';
import { AuthService } from './auth.service';
import { BeneficiaryModel } from 'src/app/store/dashboard/models/beneficiary.model';
import { CreateBeneficiaryModel } from 'src/app/store/dashboard/models/create-beneficiary.model';


@Injectable()
export class BeneficiaryService {

    protected api: string = environment.api;
    protected version: string = environment.version;
    protected apiUrl: string = `${ this.api }/${ this.version }`;

    constructor(
        private readonly http: HttpClient,
        private readonly authService: AuthService,
    ) {}

    public create( form: CreateBeneficiaryModel ): Observable<BeneficiaryModel> {
        return this.http.post<BeneficiaryModel>(`${ this.apiUrl }/beneficiary`, form, this.getHeaders() );
    }

    public findAll(
        queryParams?: any
    ): Observable<PaginationResponseModel<BeneficiaryModel>> {
        
        return this.http.get<PaginationResponseModel<BeneficiaryModel>>(
            `${ this.apiUrl }/beneficiary${ 
                ( queryParams ) && '?' + this.createQueryString( queryParams )
            }`, 
            this.getHeaders(),
        );
    }

    public findOne( id: string ): Observable<BeneficiaryModel> {
        return this.http.get<BeneficiaryModel>(`${ this.apiUrl }/beneficiary/${ id }`, this.getHeaders() );
    }

    public update( id: string, obj: any ): Observable<BeneficiaryModel> {
        
        return this.http
            .patch<BeneficiaryModel>( `${ this.apiUrl }/beneficiary/${ id }`, obj, this.getHeaders() );
    }

    public delete( id: string ): Observable<BeneficiaryModel> {
        
        return this.http
            .delete<BeneficiaryModel>( `${ this.apiUrl }/beneficiary/${ id }`, this.getHeaders() );
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