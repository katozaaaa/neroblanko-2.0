import '@/main'
import UnderlinedText from '@components/underlinedText/underlinedText'
import Header from '@components/header/header'
import Footer from '@components/footer/footer'
import Aside from '@components/aside/aside'
import Modal from '@components/modal/modal'
import Form from '@components/form/form'

interface PageOptions {
  root?: HTMLElement
}

export default class Page {
  _root: HTMLElement
  _header?: Header
  _footer?: Footer
  _aside?: Aside
  _contactModal?: Modal
  _contactForm?: Form

  constructor(options: PageOptions) {
    const { root } = options
    if (!(root instanceof HTMLElement)) {
      throw new Error('No root element found')
    }
    this._root = root
    this._updateModalElementsSize = this._updateModalElementsSize.bind(this)
    this._initHeader()
    this._initFooter()
    this._initAside()
    this._initContactModal()
    this._initContactForm()
    this._initUnderlinedText()
  }

  _initHeader() {
    const header = this._root.querySelector('.js-header')
    if (header instanceof HTMLElement) {
      this._header = new Header({ root: header })
    }
  }

  _initFooter() {
    const footer = this._root.querySelector('.js-footer')
    if (footer instanceof HTMLElement) {
      this._footer = new Footer({ root: footer })
    }
  }

  _initAside() {
    const aside = this._root.querySelector('.js-aside')
    if (aside instanceof HTMLElement) {
      this._aside = new Aside({ root: aside })
    }
  }

  _initContactModal() {
    const contactModal = this._root.querySelector('.js-contact-modal')
    if (!(contactModal instanceof HTMLElement)) {
      return
    }
    const modal = new Modal({ root: contactModal })
    this._contactModal = modal
    if (this._footer) {
      this._footer.initContactButton(modal.open.bind(modal))
    }
    this._updateModalElementsSizeWhenStylesIsLoaded()
    this._initResizeListener()
  }

  _updateModalElementsSizeWhenStylesIsLoaded() {
    // The loadStyles event is generated when styles are inserted in the head
    if (process.env.NODE_ENV === 'development') {
      document.addEventListener('loadStyles', this._updateModalElementsSize)
    } else {
      this._updateModalElementsSize()
    }
  }

  _initResizeListener() {
    window.addEventListener('resize', this._updateModalElementsSize.bind(this))
  }

  _updateModalElementsSize() {
    try {
      if (!this._contactModal) {
        return
      }
      const headerHeight = this._header?.height
      const asideImageTopPosition = this._aside?.imageTopPosition
      if (headerHeight && asideImageTopPosition) {
        this._contactModal.setHeaderMinHeight(headerHeight)
        this._contactModal.setBodyInnerTopOffset(asideImageTopPosition)
      }
    } catch (error) {
      console.error(error)
    }
  }

  _initContactForm() {
    const contactForm = this._root.querySelector('.js-contact-form')
    if (!(contactForm instanceof HTMLElement)) {
      return
    }
    this._contactForm = new Form({
      root: contactForm,
      inputConfigs: {
        name: {
          validatingCallback: (value) => {
            return /^[a-zA-Zа-яА-ЯёЁ\s\-']{2,50}$/.test(value)
          }
        },
        email: {
          validatingCallback: (value) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          }
        },
        subject: {
          validatingCallback: () => {
            return true
          }
        }
      },
      onSubmit: () => {
        console.log('Sending form')
      }
    })
  }

  _initUnderlinedText() {
    this._root.querySelectorAll('.js-underlined-text').forEach((element) => {
      if (element instanceof HTMLElement) {
        new UnderlinedText({ root: element })
      }
    })
  }
}
