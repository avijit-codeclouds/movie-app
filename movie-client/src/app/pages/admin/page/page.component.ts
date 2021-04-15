import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, Event, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from './../../../services/admin.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent {
  adminServiceSubscription: Subscription;
  navTitle: string = "Dashboard";
  buttonConfigs: Array<any> = [];

  constructor(private cd: ChangeDetectorRef, private activatedroute:ActivatedRoute,  private router: Router, private adminService: AdminService) { 
    this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
            this.navTitle = this.activatedroute.snapshot.firstChild.data.title;
            this.buttonConfigs = [];
        }
    });

    this.adminServiceSubscription = this.adminService.buttonSubjectInstance().subscribe(config => {
      this.buttonConfigs = config;
      this.cd.detectChanges();
    });
  }

  ngOnDestroy() {
    this.adminServiceSubscription.unsubscribe();
    this.buttonConfigs = [];
    console.log('destroy')
  }

  onClick(btn) {
    this.adminService.sendClick(btn.key, {});
  }

}
