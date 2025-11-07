interface ModalOptions {
  root?: HTMLElement
}

export default class Modal {
  _root: HTMLElement

  constructor(options: ModalOptions) {
    const { root } = options
    if (!(root instanceof HTMLElement)) {
      throw new Error('No root element found')
    }
    this._root = root
    this._handleOutsideClick = this._handleOutsideClick.bind(this)
    this._initCloseButton()
  }

  open() {
    this.toggle(true)
  }

  close() {
    this.toggle(false)
  }

  toggle(force: boolean) {
    const toggleEventListener = force
      ? document.addEventListener
      : document.removeEventListener
    setTimeout(() => {
      this._root.classList.toggle('open', force)
      toggleEventListener('click', this._handleOutsideClick)
    })
  }

  setHeaderMinHeight(minHeight: number) {
    const header = this._root.querySelector('.js-modal-header')
    if (header instanceof HTMLElement) {
      header.style.minHeight = minHeight + 'px'
    }
  }

  setBodyInnerTopOffset(topOffset: number) {
    const body = this._root.querySelector('.js-modal-body')
    if (body instanceof HTMLElement) {
      body.style.paddingTop = topOffset + 'px'
    }
  }

  _handleOutsideClick(e: MouseEvent) {
    if (e.target instanceof Element && !this._root.contains(e.target)) {
      this.close()
    }
  }

  _initCloseButton() {
    const closeButton = this._root.querySelector('.js-close-button')
    console.log(closeButton)
    if (closeButton) {
      closeButton.addEventListener('click', this.close.bind(this))
    }
  }
}
