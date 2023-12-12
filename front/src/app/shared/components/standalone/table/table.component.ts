import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnModel } from 'src/app/shared/models/column.model';
import { AtomsModule } from '../../atoms/atoms.module';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectOption } from 'src/app/shared/interfaces/select-option.interface';
import { PaginationModel } from 'src/app/shared/models/pagination.model';
import { ToastrService } from 'ngx-toastr';
import { ParseMongoIdPipe } from 'src/app/shared/pipes/parse-mongo-id.pipe';
import { ParseCategoryPipe } from 'src/app/shared/pipes/parse-category.pipe';
import { AnimateService } from 'src/app/shared/services/animate.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    AtomsModule,
    ReactiveFormsModule,
    ParseMongoIdPipe,
    ParseCategoryPipe,
  ],
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @ViewChild('table') table!: ElementRef;
  public loading: boolean = true;

  /**
   * * Style Properties
   */
  @Input() elevation: boolean = false;
  @Input() color: string = 'white';

  /**
   * * Table Title and Alignment
   */
  @Input() title: string = 'Titulo de tabla';
  @Input() align: string = 'horizontal';

  /**
   * * Table data
   */
  @Input() columns!: ColumnModel[]; 
  @Input() items!: any[];

  /**
   * * Table Pagination
   */
  @Input() pagination!: PaginationModel;
  public limitForm: FormGroup = this.fb.group({
    limit: [10],
  });
  public limitOptions: SelectOption[] = [
    { name: '10', value: 10 },
    { name: '25', value: 25 },
    { name: '50', value: 50 },
    { name: '100', value: 100 },
  ];

  /**
   * * Hanlde Output Events 
   */
  @Output() handleLimit = new EventEmitter<number>();
  @Output() handlePage = new EventEmitter<number>();
  @Output() handleAction = new EventEmitter<any>();

  /**
   * * Drag Horizontal Scroll
   */
  public isDown: boolean = false;
  public startX: any;
  public scrollLeft: any;

  /**
   * * Modal Image
   */
  @ViewChild('modalImage', { static: true }) modalImage!: ElementRef;
  public imageModalSrc: string = '';

  /**
   * * Blank Spaces // Fake Data with white spaces
   */
  public blanks: any[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly animateService: AnimateService,
    private readonly toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    
    this.limitForm.controls['limit'].valueChanges
      .subscribe(( value ) => {
        
        this.handleLimit.emit( value );
    });

    this.setBlanks();
    setTimeout(() => {
      this.loading = false;
    }, 1200);
  }

  changePage(
    type?: string,
    page?: number,
  ): void {
    let pageToGo: number = 1;

    if ( page ) 
      pageToGo = page;
    if ( type === 'first' ) 
      pageToGo = 1;
    if ( type === 'last' ) 
      pageToGo = this.pagination.totalPages;

    if ( type === 'prev' ) {
      
      if ( !this.pagination.prevPage ) {

        this.toastrService.info('Te encuentras en la primer pagina');
        return;
      }
      pageToGo = this.pagination.prevPage;
    }

    if ( type === 'next' ) {

      if ( !this.pagination.nextPage ) {

        this.toastrService.info('Te encuentras en la ultima pagina');
        return;
      }
      pageToGo = this.pagination.nextPage;
    }

    this.handlePage.emit( pageToGo );
    window.scrollTo({
      top: this.table.nativeElement.offsetTop - 70,
      left: 0,
      behavior: 'smooth',
    });
  }

  sendAction( id: string, action: string ): void {

    this.handleAction.emit({ id, action });
  }

  setBlanks(): void {
    const items: any = [];
    this.columns.map(( column: any ) => {
      let space: any;
      for ( let prop in column ) {
        space = {
          ...space,
          [column[prop]]: ' ',
          value: ' ',
        }
      }
      
      items.push( space );
    });
    items.splice(-1);
    this.blanks = items;
  }


  /* * * * * * * * * * * * * * *
   * 
   * * Drag Scrolling Table * |
   *
   * * * * * * * * * * * * * * */
  @HostListener('mousedown', ['$event']) 
  mouseDown( e: any ): void {

    const slider: HTMLElement = document.querySelector('.drag-scroll')!;
    this.isDown = true;
    slider.classList.add('drag-scroll-active');

    this.startX = e.pageX - slider.offsetLeft;
    this.scrollLeft = slider.scrollLeft;
  }

  @HostListener('mouseleave', ['$event'])
  mouseLeave( e: any ): void {
    const slider: HTMLElement = document.querySelector('.drag-scroll')!;

    this.isDown = false;
    slider.classList.remove('drag-scroll-active');
  }

  @HostListener('mouseup', ['$event'])
  mouseUp( e: any ): void {
    const slider: HTMLElement = document.querySelector('.drag-scroll')!;

    this.isDown = false;
    slider.classList.remove('drag-scroll-active');
  }

  @HostListener('mousemove', ['$event'])
  mouseMove( e: any ): void {
    const slider: HTMLElement = document.querySelector('.drag-scroll')!;

    if( !this.isDown ) return;
    e.preventDefault();

    const x = e.pageX - slider.offsetLeft;
    const walk = (x - this.startX) * 1; //scroll-fast
    slider.scrollLeft = this.scrollLeft - walk;
  }

  /**
   * * Open Image Modal
   */
  toggleImage(  show: boolean, src?: string ): void {
    const modal: HTMLElement = this.modalImage.nativeElement;

    if ( show ) {

      this.imageModalSrc = src!;
      modal.style.display = 'flex';
      modal.setAttribute('active', 'true');
      this.animateService.toggleAnimation(
        modal, show, 'opacity', '0', '1', 200
      );
    } else {

      modal.setAttribute('active', 'false');
      this.animateService.toggleAnimation(
        modal, show, 'opacity', '0', '1', 200
      );
      setTimeout(() => {
        modal.style.display = 'none';
      }, 210);
    }

    return;
  }

  @HostListener(
    'document:keydown.escape', ['$event']
  ) onKeydownHandler() {

    ( this.modalImage.nativeElement.getAttribute('active') === 'true' ) && 
      this.toggleImage( false );
  }
}
