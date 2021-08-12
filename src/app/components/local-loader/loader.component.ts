import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-local-loader',
  template: ` <div *ngIf="loading" class="loader">
    <div class="loader__element"></div>
  </div>`,
  styles: [
    `
      .loader {
        background-color: var(--primary);
        overflow: hidden;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: flex-start;
        z-index: 100000;
      }

      .loader__element {
        height: 3px;
        width: 100%;
        background-color: var(--primary-light);
      }

      .loader__element:before {
        content: "";
        display: block;
        height: 3px;
        width: 0;
        background-color: var(--primary-dark) !important;
        animation: getWidth 1s ease-in-out infinite;
      }

      @keyframes getWidth {
        100% {
          width: 100%;
        }
      }
    `,
  ],
})
export class LocalLoaderComponent {
  @Input() loading = false;
}
