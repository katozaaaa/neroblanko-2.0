import Page from '@components/page/page';

class AboutPage extends Page {
  constructor(options = {}) {
    super(options);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new AboutPage({
    root: document.querySelector('.js-page-root')
  });
});
