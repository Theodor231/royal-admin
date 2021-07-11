import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alert = {
    success: {
      color: 'green',
      title: 'Success',
      content: 'Operation successful',
      icon: 'check_circle',
    },
    info: {
      color: '#3ac3e8',
      title: 'Info',
      content: 'Here is an info alert content',
      icon: 'info',
    },
    warning: {
      color: '#f7a745',
      title: 'Warning',
      content: 'Here is an warrning alert message!',
      icon: 'warning',
    },
    error: {
      color: '#f36e6e',
      title: 'Error',
      content: 'An error occurred',
      icon: 'remove_circle',
    },
  };

  constructor() {}
  showSuccess(content: string): void {
    this.alert.success.content = content;
    this.showMessage('success');
  }

  showInfo(content: string): void {
    this.alert.info.content = content;
    this.showMessage('info');
  }

  showWarning(content: string): void {
    this.alert.warning.content = content;
    this.showMessage('warning');
  }

  showError(content: string): void {
    this.alert.error.content = content;
    this.showMessage('error');
  }
  showMessage(type: string = 'error'): void {
    const alert = document.createElement('div');
    alert.style.padding = '10px 0';
    alert.style.backgroundColor = '#fff';
    alert.style.width = '300px';
    alert.style.marginTop = '5px';
    alert.style.display = 'flex';
    alert.style.alignItems = 'center';
    alert.style.justifyContent = 'space-between';
    alert.style.transition = 'all 0.3s ease';
    alert.style.transform = 'translateX(+400px)';
    alert.style.opacity = '0';

    setTimeout(() => {
      alert.style.transform = 'translateX(0)';
      alert.style.opacity = '1';
    }, 100);

    const title = document.createElement('div');
    title.innerHTML = this.alert[type].title;
    title.style.color = this.alert[type].color;
    title.style.fontWeight = '500';

    const border = document.createElement('div');
    border.style.backgroundColor = this.alert[type].color;
    border.style.height = `40px`;
    border.style.width = `3px`;

    const icon = document.createElement('div');
    icon.style.color = this.alert[type].color;
    icon.style.fontSize = `24px`;
    icon.style.margin = `0 10px`;
    icon.classList.add(this.alert[type].icon);

    const removeIcon = document.createElement('button');
    removeIcon.style.fontSize = `12px`;
    removeIcon.style.margin = `0 10px`;
    removeIcon.style.color = `#8f8d8d`;
    removeIcon.style.backgroundColor = `transparent`;
    removeIcon.style.float = `right`;
    removeIcon.style.cursor = `pointer`;
    const clearIcon = document.createElement('span');
    clearIcon.classList.add('material-icons');
    clearIcon.innerHTML = 'clear';
    removeIcon.appendChild(clearIcon);
    removeIcon.addEventListener('click', () => {
      alert.style.transform = 'translateX(400px)';
      alert.style.opacity = '0';
      setTimeout(() => {
        alert.remove();
      }, 100);
    });

    const contentBlock = document.createElement('div');
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.alignItems = 'center';

    const content = document.createElement('div');
    content.innerHTML = this.alert[type].content;
    content.style.color = '#8f8d8d';

    contentBlock.appendChild(title);
    contentBlock.appendChild(content);
    container.appendChild(border);
    container.appendChild(icon);
    container.appendChild(contentBlock);
    alert.appendChild(container);
    alert.appendChild(removeIcon);

    if (!document.querySelector('#alert-container')) {
      const alertContainer = document.createElement('div');
      alertContainer.style.position = 'fixed';
      alertContainer.style.right = '10px';
      alertContainer.style.bottom = '20%';
      alertContainer.style.zIndex = '1111111111';
      alertContainer.id = 'alert-container';
      alertContainer.append(alert);
      document.body.append(alertContainer);
    } else {
      document.querySelector('#alert-container').appendChild(alert);
    }

    setTimeout(() => {
      alert.style.transform = 'translateX(400px)';
      alert.style.transform = 'translateY(-40px)';
      alert.style.opacity = '0';
    }, 2500);

    setTimeout(() => {
      alert.remove();
    }, 3000);
  }
}
