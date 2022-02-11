import { Directive, HostBinding, Input } from '@angular/core';

enum ButtonColor {
  primary = 'btn-primary',
  secondary = 'btn-secondary',
  success = 'btn-success',
  danger = 'btn-danger',
  warning = 'btn-warning',
  info = 'btn-info',
  link = 'btn-link',
  outline_primary = 'btn-outline-primary',
}

enum ButtonSize {
  lg = 'btn-lg',
  md = '',
  sm = 'btn-sm'
}

@Directive({
  selector: '[appBsButton]'
})
export class BsButtonDirective {
  
  @Input() color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'link' | 'outline_primary'= 'primary';
  @Input() size: 'lg' | 'md' | 'sm';

  constructor() { }

  @HostBinding('class')
  get applyStyles(): string {
    const buttonColor: ButtonColor = ButtonColor[this.color];
    const buttonSize: ButtonSize = ButtonSize[this.size];

    return `btn ${buttonColor} ${buttonSize}`;
  }
}
