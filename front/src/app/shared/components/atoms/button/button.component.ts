import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() elevation: boolean = false;
  @Input() fit: boolean = false;
  @Input() bold: boolean = true;
  @Input() text: string = '';
  @Input() icon: string = '';
  @Input() type: string = 'submit';
  @Input() color: string = 'default';
  @Input() size: string = '13';
  @Input() disabled: boolean = false;

  @HostListener(
    'click', ['$event']
  ) onClick( e: any ): void {
    if ( e.target.getAttribute('anim') === 'ripple' ) {
      this.rippleEffect( e, e.target );
    }
    if ( e.target.parentNode.getAttribute('anim') === 'ripple' ) {
      this.rippleEffect( e, e.target.parentNode );
    }
  }

  rippleEffect( e: any, el: any ): void {
    e = e.touches ? e.touches[0] : e;
    const r = el.getBoundingClientRect(), d = Math.sqrt(Math.pow(r.width, 2.6) + Math.pow(r.height, 2)) * 2;
    el.style.cssText = `--s: 0; --o: 1;`;
    el.offsetTop;
    el.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${e.clientX - r.left}; --y:${e.clientY - r.top};`;
  }

}
