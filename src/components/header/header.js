export default class Header {
  constructor(options = {}) {
    const {
      root
    } = options;

    this._root = root;
    this._initDisplayButton();
  }

  _initDisplayButton() {
    const button = this._root.querySelector('.js-display-button');
    if (button) {
      button.addEventListener('click', (e) => {
        alert('Текущая страница: ' + window.location);
      })
    }
  }
}