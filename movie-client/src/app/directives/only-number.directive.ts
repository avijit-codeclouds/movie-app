import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[onlyNumber]'
})
export class OnlyNumberDirective {

  /**
   * prevents pasting value
   * @param event 
   */
  @HostListener('paste', ['$event'])
  handlePaste(event: KeyboardEvent) {
    event.preventDefault();
  }

  /**
   * prevents drop text
   * @param event 
   */
  @HostListener('drop', ['$event'])
  handleDrop(event: KeyboardEvent) {
    event.preventDefault();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    let alloweKeys = ['Delete', 'Backspace'];
    if ((e.key === ' ' || isNaN(Number(e.key))) && !alloweKeys.includes(e.key) ) {
      e.preventDefault();
    }
  }
}