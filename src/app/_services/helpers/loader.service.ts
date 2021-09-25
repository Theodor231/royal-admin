import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoaderService {
  isLoading = new Subject<boolean>();
  localLoader = new Subject<boolean>();
  globalLoader = new Subject<boolean>();

  constructor() {}

  show(): void {
    this.isLoading.next(true);
  }
  hide(): void {
    this.isLoading.next(false);
  }

  showLocalLoader(): void {
    this.localLoader.next(true);
  }

  hideLocalLoader(): void {
    this.localLoader.next(false);
  }

  showGlobalLoader(): void {
    this.globalLoader.next(true);
  }

  hideGlobalLoader(): void {
    this.globalLoader.next(false);
  }
}
