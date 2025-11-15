import { gsap } from 'gsap'

interface UnderlinedTextOptions {
  root?: HTMLElement
}

export default class UnderlinedText {
  _root: HTMLElement
  _underlineElements: HTMLElement[]
  _appearanceAnimation: gsap.core.Timeline | null
  _fadeAnimation: gsap.core.Timeline | null

  constructor(options: UnderlinedTextOptions) {
    const { root } = options
    if (!(root instanceof HTMLElement)) {
      throw new Error('No root element found')
    }
    this._root = root  
    this._underlineElements = []
    this._appearanceAnimation = null
    this._fadeAnimation = null;
    this._initMouseEnterListener()
    this._initMouseLeaveListener()
  }

  _createUnderlineElements() {
    this._underlineElements = []
    let lines = Array.from(this._root.querySelectorAll('.js-line'))
    if (lines.length === 0) {
      lines = [this._root]
    }
    lines.forEach(line => {
      const underlineElement = document.createElement('div')
      underlineElement.classList.add('underlined-text__underline')
      line.appendChild(underlineElement)
      this._underlineElements.push(underlineElement)
    })
  }

  _initMouseEnterListener() {
    this._root.addEventListener('mouseenter', () => {
      this._createUnderlineElements()
      this._createAppearanceAnimation(this._underlineElements.slice())
    })
  }

  _initMouseLeaveListener() {
    this._root.addEventListener('mouseleave', () => {
      if (this._appearanceAnimation?.isActive()) {
        const underlineElements = this._underlineElements.slice()
        this._appearanceAnimation.eventCallback('onComplete', () => {
          this._createFadeAnimation(underlineElements)
        })
      } else {
        this._createFadeAnimation(this._underlineElements.slice())
      }
    })
  }

  _createAppearanceAnimation(underlineElements: HTMLElement[]) {
    this._appearanceAnimation = gsap.timeline()
    const appearanceAnimation = this._appearanceAnimation
    underlineElements.forEach(element => {
      appearanceAnimation.set(element, {
        left: 0,
        right: 'unset'
      })
      appearanceAnimation.to(element, {
        duration: 0.3,
        width: '100%'
      })
    })
  }

  _createFadeAnimation(underlineElements: HTMLElement[]) {
    this._fadeAnimation = gsap.timeline({
      onComplete: () => {
        underlineElements.forEach(element => {
          element.remove()
        })
      }
    })
    const fadeAnimation = this._fadeAnimation
    underlineElements.forEach(element => {
      fadeAnimation.set(element, {
        right: 0,
        left: 'unset'
      })
      fadeAnimation.fromTo(element, 
        {
          width: '100%'
        }, {
          duration: 0.3,
          width: 0,
        }
      )
    })
  }
}
