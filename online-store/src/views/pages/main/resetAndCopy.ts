
/* eslint-disable no-console */

import { Messages } from "../../components/constants";
import { tsQuerySelector } from "../../components/helpers"

const setFiltersButton = () => {
  const buttonContainer = tsQuerySelector(document, '.filters-buttons');
  buttonContainer.addEventListener('click', (e: Event) => {
    if (!(e.target instanceof HTMLElement)) return;
    const {target} = e;
    if (target.classList.contains('button__reset')) { 
      window.location.hash = '';
    }
    if (target.classList.contains('button__copy')) {
      const copyButton = tsQuerySelector(document, '.button__copy');
      navigator.clipboard.writeText(window.location.href)
      .then(() => {
        if (copyButton.textContent !== Messages.copied) {
          const originalText = copyButton.textContent;
          copyButton.textContent = Messages.copied;
          setTimeout(() => {
            copyButton.textContent = originalText;
          }, 1000);
        }
      })
      .catch(() => {
        console.error(Messages.error);
      })
    }
  })
}
export default setFiltersButton
