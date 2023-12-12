import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel, UserModel, UserWithTokenModel } from '../../store/auth/models';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/auth/auth.state';
import { environment } from 'src/app/environments/environment';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class AuthService {

    protected api: string = environment.api;
    protected version: string = environment.version;
    protected apiUrl: string = `${ this.api }/${ this.version }`;

    constructor(
        private readonly http: HttpClient,
        private readonly localStorageService: LocalStorageService,
        private readonly store: Store<AuthState>,
        private readonly router: Router,
        private readonly toastrService: ToastrService,
    ) {}

    login(
        form: LoginModel,
    ): Observable<Partial<UserWithTokenModel>> {
        return this.http.post(`${ this.apiUrl }/auth/sign-in`, form );
    }

    checkStatus(): Observable<Partial<UserWithTokenModel>> {
        return this.http.get(`${ this.apiUrl }/auth/check-status`, {
            headers: {
                'authorization': `Bearer ${ this.getToken() }`
            }
        });
    }

    saveTokenAndUser( token: string, user: UserModel ): void {
        this.localStorageService.saveData( 'token', token );
        this.localStorageService.saveData( 'user', JSON.stringify( user ));
    }

    getToken(): string {
        return this.localStorageService.getData('token');
    }

    getUser(): string {
        return this.localStorageService.getData('user');
    }

    removeTokenAndUser(): void {
        this.localStorageService.removeData('token');
        this.localStorageService.removeData('user');
    }
}