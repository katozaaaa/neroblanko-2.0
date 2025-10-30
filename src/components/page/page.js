import '@/main.js';
import Header from '@components/header/header';

export default class Page {
  constructor(options = {}) {
    const {
      root
    } = options;

    this._root = root;
    this._initHeader();
  }

  _initHeader() {
    const header = this._root.querySelector('.js-header');
    if (header) {
      this._header = new Header({ root: header});
    }
  }
}