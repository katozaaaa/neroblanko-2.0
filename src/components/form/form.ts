import Input from '@components/input/input'

interface InputConfig {
  validatingCallback: (value: string) => boolean
  messages?: {
    onInvalid?: string
    onEmpty?: string
  }
}

interface FormOptions {
  root: HTMLElement
  inputConfigs: {
    [name: string]: InputConfig
  }
}

export default class Form {
  _root: HTMLElement
  _inputConfigs: {
    [name: string]: InputConfig
  }
  _inputs: {
    [name: string]: Input
  }
  _submitButton: HTMLButtonElement

  constructor(options: FormOptions) {
    const { root, inputConfigs } = options
    if (!(root instanceof HTMLElement)) {
      throw new Error('No root element found')
    }
    this._root = root
    const submitButton = this._root.querySelector('.js-submit-button')
    if (!(submitButton instanceof HTMLButtonElement)) {
      throw new Error('Submit button is missing')
    }
    this._submitButton = submitButton
    this._inputConfigs = inputConfigs
    this._inputs = {}
    this._setUpInputControllers()
  }

  _setUpInputControllers() {
    Object.keys(this._inputConfigs).forEach((name) => {
      const inputElement = this._root.querySelector(`.js-input-${name}`)
      if (inputElement instanceof HTMLElement) {
        this._inputs[name] = new Input({
          root: inputElement,
          ...this._inputConfigs[name],
          onInput: this.validate.bind(this)
        })
      }
    })
  }

  validate() {
    if (this.isValid()) {
      this.enableSubmitButton()
    } else {
      this.disableSubmitButton()
    }
  }

  isValid() {
    return Object.values(this._inputs).every(
      (input) => input.isValid() && !input.isEmpty()
    )
  }

  enableSubmitButton() {
    this._submitButton.removeAttribute('disabled')
  }

  disableSubmitButton() {
    this._submitButton.setAttribute('disabled', '')
  }
}
