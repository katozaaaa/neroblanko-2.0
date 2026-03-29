interface AsideOptions {
  root: HTMLElement
}

export default class Footer {
  _root: HTMLElement

  constructor(options: AsideOptions) {
    const { root } = options
    if (!(root instanceof HTMLElement)) {
      throw new Error('No root element found')
    }
    this._root = root
  }
}
