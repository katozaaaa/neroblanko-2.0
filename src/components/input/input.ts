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
    this._validatingCallback = validatingCallback
    this._initInputListener()
    this._initChangeListener()
  }

  validate() {
    if (!this.isValid()) {
      this._setMessage(this._messages.onInvalid)
    } else {
      this._removeMessage()
    }
  }

  showMessageAboutEmptyInput() {
    this._setMessage(this._messages.onEmpty)
  }

  isValid() {
    return this._validatingCallback(this._input.value)
  }

  isEmpty() {
    return this._input.value === ''
  }

  _setMessage(message: string) {
    this._root.dataset.message = message
  }

  _removeMessage() {
    delete this._root.dataset.message
  }

  _initInputListener() {
    this._input.addEventListener('input', () => {
      this._removeMessage.bind(this)
      if (this._onInput) {
        this._onInput()
      }
    })
  }

  _initChangeListener() {
    this._input.addEventListener('change', this.validate.bind(this))
  }
}
