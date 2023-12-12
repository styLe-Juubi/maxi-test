import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectLoader } from 'src/app/store/ui/core/ui.selector';
import { UiState } from 'src/app/store/ui/ui.state';

@Component({
  standalone: true,
  imports: [ CommonModule ],
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  public loader$ = this.store.pipe( select( selectLoader ));

  constructor(
    private readonly store: Store<UiState>,
  ) {}

}
