import '@/main';
import Header from '@components/header/header';

interface Options {
  root?: Element
}

export default class Page {
  _root: Element;
  _header: Header | null;

  constructor(options: Options = {}) {
    const {
      root
    } = options;
    if (!root) {
      throw new Error('No root element found');
    }
    this._root = root;
    this._header = null;
    this._initHeader();
  }

  _initHeader() {
    const header = this._root.querySelector('.js-header');
    if (header) {
      this._header = new Header({ root: header });
    }
  }
}