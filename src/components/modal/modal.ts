import { gsap } from 'gsap'

interface ModalOptions {
  root?: HTMLElement
}

export default class Modal {
  _root: HTMLElement
  _animation: gsap.core.Tween

  constructor(options: ModalOptions) {
    const { root } = options
    if (!(root instanceof HTMLElement)) {
      throw new Error('No root element found')
    }
    this._root = root
    this._handleOutsideClick = this._handleOutsideClick.bind(this)
    this._animation = this._setUpAnimation()
    this._initCloseButton()
  }

  open() {
    this.toggle(true)
  }

  close() {
    this.toggle(false)
  }

  toggle(force: boolean) {
    if (force) {
      this._animation.timeScale(1).play()
    } else {
      this._animation.timeScale(2).reverse()
    }
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

  _setUpAnimation() {
    return gsap.fromTo(
      this._root,
      {
        clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'
      },
      {
        duration: 0.6,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        paused: true,
        onStart: () => {
          this._root.classList.add('open')
          document.addEventListener('click', this._handleOutsideClick)
        },
        onReverseComplete: () => {
          this._root.classList.remove('open')
          document.removeEventListener('click', this._handleOutsideClick)
        }
      }
    )
  }

  _handleOutsideClick(e: MouseEvent) {
    if (e.target instanceof Element && !this._root.contains(e.target)) {
      this.close()
    }
  }

  _initCloseButton() {
    const closeButton = this._root.querySelector('.js-close-button')
    if (closeButton) {
      closeButton.addEventListener('click', this.close.bind(this))
    }
  }
}
