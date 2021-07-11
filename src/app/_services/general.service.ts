import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  showGlobalPreloader = new BehaviorSubject(null);
  moduleName = new BehaviorSubject('');
  showSideBar = false as boolean;
  filter = {} as any;
  userEvent = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.setModuleName();
    if (localStorage.getItem('credentials')) {
      const credentials = JSON.parse(localStorage.getItem('credentials'));
      this.userEvent.next(credentials.user);
    }
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.setModuleName();
      }
    });
  }

  setModuleName(): any {
    const [, , module] = this.router.url.split('/');
    this.moduleName.next(module);
    return this;
  }

  hidePreloader(): any {
    this.showGlobalPreloader.next(false);
    return this;
  }

  showPreloader(): any {
    this.showGlobalPreloader.next(true);
    return this;
  }

  toggleSideBar(): any {
    this.showSideBar = !this.showSideBar;
    return this;
  }

  async applyFilters(): Promise<void> {
    await this.router.navigate([], {
      queryParams: this.filter,
      relativeTo: this.route,
    });
  }

  async resetFilter(): Promise<void> {
    this.filter = {};
    await this.applyFilters();
  }

  parseFilter(): void {
    const filters = this.route.snapshot.queryParams;
    this.filter = { ...filters };
    return this.filter;
  }
}
