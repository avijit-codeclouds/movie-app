import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from './../../../services/admin.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  clickSubscription: Subscription;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.updateButtonSubject([
      {
        label: "Add Movie",
        key: "add-movie",
        class: ""
      }
    ]);
    this.clickSubscription = this.adminService.onClick().subscribe(event => {
      if (event.type == 'add-movie') {
        console.log('add Movie')
      }
    })
  }

  ngOnDestroy() {
    this.clickSubscription.unsubscribe();
    this.adminService.updateButtonSubject([]);
  }

}
