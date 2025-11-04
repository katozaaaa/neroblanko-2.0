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

  get imageTopPosition() {
    const image = document.querySelector('.js-aside-image')
    if (image instanceof HTMLElement) {
      return image.offsetTop
    } else {
      throw new Error('No image element found')
    }
  }
}
