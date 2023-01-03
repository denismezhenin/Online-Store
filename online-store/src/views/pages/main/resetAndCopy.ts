import { tsQuerySelector } from "../../components/helpers"

export const setFiltersButton = () => {
  const buttonContainer = tsQuerySelector(document, '.filters-buttons');
  buttonContainer.addEventListener('click', (e: Event) => {
    if (!(e.target instanceof HTMLElement)) return;
    const target = e.target;
    if (target.classList.contains('button__reset')) {
      location.hash = ''
    }
    if (target.classList.contains('button__copy')) {
      const copyButton = tsQuerySelector(document, '.button__copy');
      navigator.clipboard.writeText(location.href)
      .then(() => {
        if (copyButton.textContent !== 'Copied!') {
          const originalText = copyButton.textContent;
          copyButton.textContent = 'Copied !';
          setTimeout(() => {
            copyButton.textContent = originalText;
          }, 1000);
        }
      })
      .catch(err => {
        console.error('Something went wrong');
      })
    }
  })
}
