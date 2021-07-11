export default {
  open_toast(options?): void {
    const elem = document.createElement('div');
    const main = document.createElement('div');

    elem.style.width = '250px';
    elem.style.height = '60px';
    main.style.position = 'fixed';
    main.style.top = '120px';
    main.style.right = '20px';
    main.style.zIndex = '1111';
    elem.style.padding = '5px';
    elem.style.background = '#80cf95';
    elem.style.color = '#000';
    elem.id = 'toasts';
    elem.animate(
      [{ transform: 'translateX(3000px)' }, { transform: 'translateX(0px)' }],
      {
        duration: 400,
      }
    );
    elem.style.display = 'block';

    const container = document.createElement('div') as HTMLDivElement;
    container.innerHTML = '';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.padding = '5px';

    const title = document.createElement('h1');
    title.textContent = 'success';
    title.style.fontSize = '16px';

    const text = document.createElement('div');
    text.textContent = 'Operation completed successfully';

    container.appendChild(title);
    container.appendChild(text);

    elem.appendChild(container);

    main.appendChild(elem);
    main.id = 'main-continer';

    main.style.display = 'flex';
    main.style.flexDirection = 'column';
    elem.style.margin = '5px';

    if (options) {
      for (const key of Object.keys(options)) {
        if (key === 'title') {
          title.textContent = options[key];
        }
        if (key === 'text') {
          text.textContent = options[key];
        }
        if (key === 'background') {
          elem.style.background = options[key];
        }
        if (key === 'color') {
          elem.style.color = options[key];
        }
      }
    }

    if (document.getElementById('main-continer')) {
      document.getElementById('main-continer').appendChild(elem);
    } else {
      document.body.append(main);
    }

    setTimeout(() => {
      elem.animate([{ transition: '1s easi-out' }], {
        duration: 1000,
      });
      elem.style.display = 'none';
    }, 3000);
  },
  openConfirm(): void {
    const main = document.createElement('div');
    const elem = document.createElement('div');
    const done = document.createElement('button');
    const cancel = document.createElement('button');
    const close = document.createElement('button');

    close.style.position = 'absolute';
    close.style.top = '5px';
    close.style.right = '5px';
    const closeIcon = document.createElement('span');
    closeIcon.classList.add('material-icons');
    closeIcon.innerHTML = 'cancel';
    close.appendChild(closeIcon);

    main.innerHTML = '';
    main.style.position = 'fixed';
    main.style.top = '0';
    main.style.left = '0';
    main.style.zIndex = '1111';
    main.style.width = '100%';
    main.style.height = '100%';
    main.style.background = 'rgba(0, 0, 0, 0.63)';
    main.style.display = 'flex';
    main.style.alignItems = 'center';
    main.style.justifyContent = 'center';

    main.addEventListener('click', () => {
      elem.style.scale = '1.02';

      setTimeout(() => {
        elem.style.scale = '1';
      }, 200);
    });

    elem.style.padding = '30px';
    elem.style.background = '#fff';
    elem.style.position = 'relative';
    elem.style.display = 'flex';

    done.textContent = 'done';
    done.style.background = 'transparent';
    done.style.border = 'none';
    done.style.outline = 'none';
    const doneIcon = document.createElement('span');
    doneIcon.classList.add('material-icons');
    doneIcon.innerHTML = 'done';
    done.appendChild(doneIcon);

    cancel.textContent = 'cancel';
    cancel.style.background = 'transparent';
    cancel.style.border = 'none';
    cancel.style.outline = 'none';
    const cancelIcon = document.createElement('span');
    cancelIcon.classList.add('material-icons');
    cancelIcon.innerHTML = 'cancel';
    cancel.appendChild(cancelIcon);

    close.style.outline = 'none';
    close.style.background = 'transparent';
    close.style.border = 'none';

    close.addEventListener('click', () => {
      main.style.display = 'none';
    });

    cancel.addEventListener('click', () => {
      main.style.display = 'none';
    });

    elem.append(done);
    elem.append(cancel);
    elem.append(close);

    main.appendChild(elem);
    document.body.append(main);
  },
};
