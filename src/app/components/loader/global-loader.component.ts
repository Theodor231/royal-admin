import { Component, EventEmitter, OnDestroy } from "@angular/core";
import { LoaderService } from "../../_services/helpers/loader.service";
import { takeUntil } from "rxjs/operators";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "global-loader",
  template:
    "<div  *ngIf=\"loading\" class=\"loader-container\"> <div class=\"loader\"></div><div translate=\"menu.loading\"></div></div>",
  styles: [
    "" +
      ".loader-container {\n" +
      " position: fixed;" +
      " top: 0;" +
      " left: 0;" +
      " z-index: 11111111111;" +
      " display: flex;" +
      " align-content: center;" +
      " align-items: center;" +
      " justify-content: center;" +
      " height: 100vh;" +
      " width: 100%;" +
      "background-color: #fff;" +
      " }" +
      ".loader {\n" +
      "  border: 5px solid #f3f3f3;\n" +
      "  border-radius: 50%;\n" +
      "  border-top: 5px solid #3498db;\n" +
      "  width: 80px;\n" +
      "  height: 80px;\n" +
      "  -webkit-animation: spin 1s linear infinite; /* Safari */\n" +
      "  animation: spin 1s linear infinite;\n" +
      "}\n" +
      "\n" +
      "/* Safari */\n" +
      "@-webkit-keyframes spin {\n" +
      "  0% { -webkit-transform: rotate(0deg); }\n" +
      "  100% { -webkit-transform: rotate(360deg); }\n" +
      "}\n" +
      "\n" +
      "@keyframes spin {\n" +
      "  0% { transform: rotate(0deg); }\n" +
      "  100% { transform: rotate(360deg); }\n" +
      "}",
  ],
})
export class GlobalLoaderComponent implements OnDestroy {
  loading = false;
  notifySubject = new EventEmitter();

  constructor(private loader: LoaderService) {
    loader.globalLoader
      .pipe(takeUntil(this.notifySubject))
      .subscribe((isLoading: boolean) => {
        this.loading = isLoading;
      });
  }

  ngOnDestroy(): void {
    this.notifySubject.next(false);
    this.notifySubject.complete();
  }
}
