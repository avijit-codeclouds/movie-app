import { Component, Input, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() show: boolean = false;
  @Output() onHidden = new EventEmitter<any>();
  @Input() config = {
    header: false,
    footer: false
  };
  @Input() title: string = "";

  id: string = 'modal-'+ (Math.random() * 100).toFixed(0);

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['show'] && changes['show'].currentValue == true) {
      $('#' + this.id).modal({
        keyboard: false,
        backdrop: 'static'
      });
      $('#' + this.id).on('hidden.bs.modal', (e) => {
        this.onHidden.emit(e)
      });
    } else {
      $('#' + this.id).modal('hide');
    }
  }

}
