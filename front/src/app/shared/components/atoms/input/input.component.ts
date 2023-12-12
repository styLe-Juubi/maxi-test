import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(
      () => InputComponent
    ),
    multi: true
  }]
})
export class InputComponent implements ControlValueAccessor, OnInit {

  /**
   * * Input Styles *
   */
  @Input() elevation: boolean = true;
  @Input() fit: boolean = false;
  @Input() color: string = 'default';
  @Input() icon: string = '';

  /**
   * * Input Properties | Reactive Form * 
  */
  @Input() parentForm!: FormGroup;
  @Input() fieldName!: string;
  @Input() type!: string;
  @Input() placeholder: string = 'Insert placeholder ...';
  @Input() isDisabled!: boolean;
  public defaultType!: string;
  public value!: string;
  public changed!: ( value: string ) => void;
  public touched!: () => void;

  get formField (): FormControl {
    return this.parentForm?.get( this.fieldName ) as FormControl;
  }

  ngOnInit(): void {
    this.defaultType = this.type;
  }

  writeValue( value: string ): void {
    this.value = value;
  }

  onChange( event: Event ): void {
    const value: string =
      ( <HTMLInputElement>event.target ).value;
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

  togglePasswordVisible(): void {
    this.type = ( this.type === 'show-password-text' ) ? 'password': 'show-password-text';
  }

}
