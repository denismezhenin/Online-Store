import { tsQuerySelector } from "../../components/helpers"
import { setQueryParam } from "./queryParams"

export const setSortParam = () => {
  const select = tsQuerySelector<HTMLSelectElement>(document, '.product-select__options')
  select.addEventListener('change', () => {
  setQueryParam('sort', select.value)
})
}