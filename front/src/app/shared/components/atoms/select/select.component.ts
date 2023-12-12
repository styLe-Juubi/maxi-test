import { Component, ElementRef, HostListener, Input, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from 'src/app/shared/interfaces/select-option.interface';
import { AnimateService } from 'src/app/shared/services/animate.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(
      () => SelectComponent
    ),
    multi: true
  }]
})
export class SelectComponent implements ControlValueAccessor {
  @ViewChild('selectList', { static: true }) selectList!: ElementRef;
  @ViewChild('selectListIcon', { static: true }) selectListIcon!: ElementRef;
  
  /**
   * * Select Styles *
   */
  @Input() elevation: boolean = false;
  @Input() fit: boolean = false;
  @Input() color!: string;

  /**
   * * Select Form Promerties | Reactive Form *
   */
  @Input() selectOptions!: SelectOption[];
  @Input() parentForm!: FormGroup;
  @Input() fieldName!: string;
  @Input() placeholder: string = 'Agregar placeholder ...';
  @Input() isDisabled: boolean = false;

  public value!: string;
  public changed!: ( value: string ) => void;
  public touched!: () => void;
  get formField (): FormControl {
    return this.parentForm?.get( this.fieldName ) as FormControl;
  }

  public viewSelected?: string;
  public valueSelected?: string;
  public activeList: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly animateService: AnimateService,
  ) {}

  writeValue( value: string ): void {
    this.value = value;
  }

  onChange( value: string ): void {
    
    this.changed( value );
  }

  registerOnChange( fn: any ): void {
    this.changed = fn;
  }

  registerOnTouched( fn: any ): void {
    this.touched = fn;
  }

  setDisabledState( isDisabled: boolean ): void {
    this.isDisabled = isDisabled;
  }

  toggleList( show: boolean ): void {
    this.activeList = show;

    this.animateService.toggleAnimation(
      this.selectList.nativeElement, show, 'maxHeight',
      '0px', '210px', 300,
    );

    this.animateService.toggleAnimation(
      this.selectListIcon.nativeElement, show, 'rotate',
      '0deg', '180deg', 300,
    );
  }

  setValue( item: any ): void {
    this.valueSelected = item.value;
    this.viewSelected = item.name;

    this.onChange( item.value );
    this.toggleList( false );
  }

  @HostListener(
    'document:click', ['$event']
  ) onDocumentClick( event: any ): void {

    if ( this.activeList ) {
      this.toggleList( false );
    }
  }

  @HostListener(
    'document:keydown.escape', ['$event']
  ) onKeydownHandler( event: KeyboardEvent ): void {
    
    if ( this.activeList ) {
      this.toggleList( false );
    }
  }
}
