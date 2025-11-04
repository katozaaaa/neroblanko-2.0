interface HeaderOptions {
  root: HTMLElement
}

export default class Header {
  _root: HTMLElement

  constructor(options: HeaderOptions) {
    const { root } = options
    if (!(root instanceof HTMLElement)) {
      throw new Error('No root element found')
    }
    this._root = root
  }

  get height() {
    return this._root.clientHeight
  }
}
