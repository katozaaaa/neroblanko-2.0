import '@/main.js';
import Page from '@components/page/page';

class HomePage extends Page {
  constructor(options = {}) {
    super(options);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new HomePage({
    root: document.querySelector('.js-page-root')
  });
});
