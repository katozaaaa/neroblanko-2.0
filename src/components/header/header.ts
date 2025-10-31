interface Options {
  root?: Element;
}

export default class Header {
  _root: Element;

  constructor(options: Options = {}) {
    const { root } = options;
    if (!root) {
      throw new Error('No root element found');
    }
    this._root = root;
    console.log('Initializing header');
  }
}
