interface InputOptions {
  root: HTMLElement
  validatingCallback: (value: string) => boolean
  messages?: {
    onInvalid?: string
    onEmpty?: string
  }
  onInput?: () => void
}

export default class Input {
  _root: HTMLElement
  _input: HTMLInputElement | HTMLTextAreaElement
  _validatingCallback: (value: string) => boolean
  _messages: {
    onInvalid: string
    onEmpty: string
  }
  _onInput?: () => void
  _lastIncorrectValue: string | null

  constructor(options: InputOptions) {
    const { root, validatingCallback, messages, onInput } = options
    const input = root.querySelector('input') || root.querySelector('textarea')
    if (
      !(input instanceof HTMLInputElement) &&
      !(input instanceof HTMLTextAreaElement)
    ) {
      throw new Error('No input element found')
    }
    this._root = root
    this._input = input
    this._messages = {
      onInvalid: messages?.onInvalid || 'Incorrectly filled in field',
      onEmpty: messages?.onEmpty || 'The field must not be empty'
    }
    this._onInput = onInput
    this._lastIncorrectValue = null
    this._validatingCallback = validatingCallback
    this._initInputListener()
    this._initChangeListener()
  }

  validate() {
    if (!this.isValid() && !this.isEmpty()) {
      this._lastIncorrectValue = this.value
      this._setMessage(this._messages.onInvalid)
      this._showMessage()
    } else {
      this._hideMessage()
    }
  }

  get value() {
    return this._input.value
  }

  showMessageAboutEmptyInput() {
    this._setMessage(this._messages.onEmpty)
    this._showMessage()
  }

  isValid() {
    return this._validatingCallback(this.value)
  }

  isEmpty() {
    return this.value === ''
  }

  _setMessage(message: string) {
    this._root.dataset.message = message
  }

  _showMessage() {
    this._root.classList.add('show-message')
  }

  _hideMessage() {
    this._root.classList.remove('show-message')
  }

  _initInputListener() {
    this._input.addEventListener('input', () => {
      if (this.value === this._lastIncorrectValue) {
        this._setMessage(this._messages.onInvalid)
        this._showMessage()
      } else {
        this._hideMessage()
      }
      if (this._onInput) {
        this._onInput()
      }
    })
  }

  _initChangeListener() {
    this._input.addEventListener('change', this.validate.bind(this))
  }
}
