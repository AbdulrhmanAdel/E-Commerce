import { Observable } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent implements OnInit {
  breadcrumbs$: Observable<any[]>;
  constructor(private crumbService: BreadcrumbService) { }

  ngOnInit(): void {
    this.breadcrumbs$ = this.crumbService.breadcrumbs$;
  }
}
