interface FooterOptions {
  root: HTMLElement
}

export default class Footer {
  _root: HTMLElement

  constructor(options: FooterOptions) {
    const { root } = options
    if (!(root instanceof HTMLElement)) {
      throw new Error('No root element found')
    }
    this._root = root
  }

  initContactButton(clickHandler: EventListener) {
    const contactButton = this._root.querySelector('.js-contact-button')
    if (contactButton) {
      contactButton.addEventListener('click', clickHandler)
    }
  }
}
