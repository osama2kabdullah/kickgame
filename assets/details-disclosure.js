class DetailsDisclosure extends HTMLElement {
  constructor() {
    super();
    this.mainDetailsToggle = this.querySelector('details');
    this.content = this.mainDetailsToggle.querySelector('summary').nextElementSibling;

    this.mainDetailsToggle.addEventListener('focusout', this.onFocusOut.bind(this));
    this.mainDetailsToggle.addEventListener('toggle', this.onToggle.bind(this));
    this.mainDetailsToggle.addEventListener('mouseenter', this.open.bind(this));
    this.mainDetailsToggle.addEventListener('mouseleave', this.close.bind(this));
  }

  onFocusOut() {
    setTimeout(() => {
      if (!this.contains(document.activeElement)) this.close();
    });
  }

  onToggle() {
    if (!this.animations) this.animations = this.content.getAnimations();

    if (this.mainDetailsToggle.hasAttribute('open')) {
      this.animations.forEach((animation) => animation.play());
    } else {
      this.animations.forEach((animation) => animation.cancel());
    }
  }

  open() {
    this.mainDetailsToggle.setAttribute('open', true);
    this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', true);
  }

  close() {
    this.mainDetailsToggle.removeAttribute('open');
    this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', false);
  }
}

customElements.define('details-disclosure', DetailsDisclosure);

class HeaderMenu extends DetailsDisclosure {
  constructor() {
    super();
    this.header = document.querySelector('.header-wrapper');
  }

  onToggle() {
    if (!this.header) return;
    this.header.preventHide = this.mainDetailsToggle.open;

    if (document.documentElement.style.getPropertyValue('--header-bottom-position-desktop') !== '') return;
    document.documentElement.style.setProperty(
      '--header-bottom-position-desktop',
      `${Math.floor(this.header.getBoundingClientRect().bottom)}px`
    );
  }
}

customElements.define('header-menu', HeaderMenu);

class DetailsHover {
  constructor(selector) {
    this.detailsElements = document.querySelectorAll(selector);
    this.attachEvents();
  }
  attachEvents() {
    this.detailsElements.forEach((detailsElement) => {
      const summaryElement = detailsElement.querySelector("summary");

      detailsElement.addEventListener("mouseenter", () => {
        detailsElement.setAttribute("open", true);
      });

      detailsElement.addEventListener("mouseleave", () => {
        detailsElement.removeAttribute("open");
      });

      detailsElement.addEventListener("mouseover", () => {
        detailsElement.setAttribute("open", true);
      });

      detailsElement.addEventListener("mouseout", (event) => {
        if (!detailsElement.contains(event.relatedTarget)) {
          detailsElement.removeAttribute("open");
        }
      });
    });
  }
}
const detailsHover = new DetailsHover(".header__inline-menu details");
