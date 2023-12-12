import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { ActionModel } from 'src/app/shared/interfaces/action.interface';
import { ColumnModel } from 'src/app/shared/models/column.model';
import { ErrorModel } from 'src/app/shared/models/error.model';
import { PaginationResponseModel } from 'src/app/shared/models/pagination-response.model';
import { PaginationModel } from 'src/app/shared/models/pagination.model';
import { deleteEmployee, getEmployee, getEmployees, resetDashboardError, resetDeletedEmployeeFlag, resetEmployee } from 'src/app/store/dashboard/core/dashboard.action';
import { selectDeletedEmployeeFlag, selectEmployee, selectEmployees, selectErrorDashboard } from 'src/app/store/dashboard/core/dashboard.selector';
import { DashboardState } from 'src/app/store/dashboard/dashboard.state';
import { EmployeeModel } from 'src/app/store/dashboard/models/employee.model';
import { employeeColumns } from './table-columns';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  /**
   * * Customers & Error Subscription
   */
  private destroy$ = new Subject<void>();
  public employee$ = this.dashboardStore.select( selectEmployee );
  public employee?: EmployeeModel;
  public employees$ = this.dashboardStore.select( selectEmployees );
  public deletedEmployeeFlag$ = this.dashboardStore.select( selectDeletedEmployeeFlag );
  public error$ = this.dashboardStore.select( selectErrorDashboard );

  /**
   * * Table Settings
   */
  public tableTitle: string = 'Lista de Empleados';
  public tableAlign: string = 'horizontal';
  public columns: ColumnModel[] = employeeColumns;
  public employees: EmployeeModel[] = [];
  public pagination?: PaginationModel;
  public queryParams?: Partial<any>;

  constructor(
    private readonly dashboardStore: Store<DashboardState>,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(( params ) => {
      
      this.queryParams = params;
      this.getEmployees( this.queryParams );
    });

    this.employee$.pipe(takeUntil( this.destroy$ )).subscribe(( value: any ) => {

      if ( value ) {
        this.employee = value;
      }
    });

    this.employees$.pipe(takeUntil( this.destroy$ )).subscribe(( value: any ) => {

      ( value ) &&
        this.setEmployeesValue( value );
    });

    this.deletedEmployeeFlag$.pipe(takeUntil( this.destroy$ )).subscribe(( value: any ) => {

      ( value ) &&
        this.showDeletedMessage();
    });

    this.error$.pipe(takeUntil( this.destroy$ )).subscribe(( value: any ) => {

      if ( value ) {

        this.handleError( value );
        this.dashboardStore.dispatch( resetDashboardError() );
      }
    });
  }
  
  getEmployees( queries: any ): void {
    this.dashboardStore.dispatch( getEmployees({ queries }));
  }

  setEmployeesValue( 
    value: PaginationResponseModel<EmployeeModel> 
  ): void {
    
    const { docs, ...rest } = value;

    this.employees = value.docs;
    this.pagination = { ...rest };
  }

  showDeletedMessage(): void {

    this.toastrService.success('El empleado ha sido dado de baja !');
    this.dashboardStore.dispatch( resetDeletedEmployeeFlag() );
    this.getEmployees( this.queryParams );
  }

  handleLimit( limit: number ): void {

    this.queryParams = {
      ...this.queryParams,
      limit,
    }

    this.router.navigate(['/dashboard/employee/list'], {
      queryParams: { ...this.queryParams }
    });
  }

  handlePage( page: number ): void {

    this.queryParams = {
      ...this.queryParams,
      page,
    }

    this.router.navigate(['/dashboard/employee/list'], {
      queryParams: { ...this.queryParams }
    });
  }

  handleAction( event: ActionModel ): void {
    const { id, action } = event;

    if ( action === 'delete' ) {
      
      this.dashboardStore.dispatch( deleteEmployee({ id }));
      return; 
    }
    
    if ( action === 'view' ) {

      this.dashboardStore.dispatch( getEmployee({ id }));
      return;
    }
  }

  handleError( error: ErrorModel ): void {

    if ( error.status === 404 ) {
      
      this.toastrService.info('No se han encontrado negocios !');
      return;
    }
  }

  closeModal(): void {
    this.employee = undefined;
    this.dashboardStore.dispatch( resetEmployee() );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
