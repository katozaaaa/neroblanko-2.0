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
  onSubmit: (e: SubmitEvent) => void
}

export default class Form {
  _root: HTMLElement
  _inputConfigs: {
    [name: string]: InputConfig
  }
  _onSubmit: (e: SubmitEvent) => void
  _inputs: {
    [name: string]: Input
  }
  _submitButton: HTMLButtonElement

  constructor(options: FormOptions) {
    const { root, inputConfigs, onSubmit } = options
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
    this._onSubmit = onSubmit
    this._inputs = {}
    this._setUpInputControllers()
    this._setUpSubmitListener()
  }

  isValid() {
    return Object.values(this._inputs).every(
      (input) => input.isValid() && !input.isEmpty()
    )
  }

  _setUpInputControllers() {
    Object.keys(this._inputConfigs).forEach((name) => {
      const inputElement = this._root.querySelector(`.js-input-${name}`)
      if (inputElement instanceof HTMLElement) {
        this._inputs[name] = new Input({
          root: inputElement,
          ...this._inputConfigs[name]
        })
      }
    })
  }

  _setUpSubmitListener() {
    this._root.addEventListener('submit', (e) => {
      e.preventDefault()
      if (this.isValid()) {
        this._onSubmit(e)
      } else {
        Object.values(this._inputs).forEach((input) => {
          if (input.isEmpty()) {
            input.showMessageAboutEmptyInput()
          }
        })
      }
    })
  }
}
