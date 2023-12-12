import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { ColumnModel } from 'src/app/shared/models/column.model';
import { DashboardState } from 'src/app/store/dashboard/dashboard.state';
import { beneficiaryColumns } from './table-columns';
import { BeneficiaryModel } from 'src/app/store/dashboard/models/beneficiary.model';
import { PaginationModel } from 'src/app/shared/models/pagination.model';
import { selectBeneficiaries, selectBeneficiary, selectDeletedBeneficiaryFlag, selectErrorDashboard } from 'src/app/store/dashboard/core/dashboard.selector';
import { deleteBeneficiary, getBeneficiaries, getBeneficiary, resetBeneficiary, resetDashboardError, resetDeletedBeneficiaryFlag } from 'src/app/store/dashboard/core/dashboard.action';
import { PaginationResponseModel } from 'src/app/shared/models/pagination-response.model';
import { ActionModel } from 'src/app/shared/interfaces/action.interface';
import { ErrorModel } from 'src/app/shared/models/error.model';

@Component({
  selector: 'app-beneficiary-list',
  templateUrl: './beneficiary-list.component.html',
  styleUrls: ['./beneficiary-list.component.scss']
})
export class BeneficiaryListComponent implements OnInit, OnDestroy {

  /**
   * * Customers & Error Subscription
   */
  private destroy$ = new Subject<void>();
  public beneficiary$ = this.dashboardStore.select( selectBeneficiary );
  public beneficiary?: BeneficiaryModel;
  public beneficiaries$ = this.dashboardStore.select( selectBeneficiaries );
  public deletedEmployeeFlag$ = this.dashboardStore.select( selectDeletedBeneficiaryFlag );
  public error$ = this.dashboardStore.select( selectErrorDashboard );

  /**
   * * Table Settings
   */
  public tableTitle: string = 'Lista de Beneficiarios';
  public tableAlign: string = 'horizontal';
  public columns: ColumnModel[] = beneficiaryColumns;
  public beneficiaries: BeneficiaryModel[] = [];
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
      this.getBeneficiaries( this.queryParams );
    });

    this.beneficiary$.pipe(takeUntil( this.destroy$ )).subscribe(( value: any ) => {

      if ( value ) {
        this.beneficiary = value;
      }
    });

    this.beneficiaries$.pipe(takeUntil( this.destroy$ )).subscribe(( value: any ) => {

      ( value ) &&
        this.setBeneficiariesValue( value );
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
  
  getBeneficiaries( queries: any ): void {
    this.dashboardStore.dispatch( getBeneficiaries({ queries }));
  }

  setBeneficiariesValue( 
    value: PaginationResponseModel<BeneficiaryModel> 
  ): void {
    
    const { docs, ...rest } = value;

    this.beneficiaries = value.docs;
    this.pagination = { ...rest };
  }

  showDeletedMessage(): void {

    this.toastrService.success('El beneficiario ha sido dado de baja !');
    this.dashboardStore.dispatch( resetDeletedBeneficiaryFlag() );
    this.getBeneficiaries( this.queryParams );
  }

  handleLimit( limit: number ): void {

    this.queryParams = {
      ...this.queryParams,
      limit,
    }

    this.router.navigate(['/dashboard/beneficiary/list'], {
      queryParams: { ...this.queryParams }
    });
  }

  handlePage( page: number ): void {

    this.queryParams = {
      ...this.queryParams,
      page,
    }

    this.router.navigate(['/dashboard/beneficiary/list'], {
      queryParams: { ...this.queryParams }
    });
  }

  handleAction( event: ActionModel ): void {
    const { id, action } = event;

    if ( action === 'delete' ) {
      
      this.dashboardStore.dispatch( deleteBeneficiary({ id }));
      return; 
    }
    
    if ( action === 'view' ) {

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
    this.beneficiary = undefined;
    this.dashboardStore.dispatch( resetBeneficiary() );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

