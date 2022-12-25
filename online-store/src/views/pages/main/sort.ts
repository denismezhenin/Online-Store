import { tsQuerySelector } from "../../components/helpers"
import { setQueryRangeParams } from "./queryParams"

export const setSortParam = () => {
  const select = tsQuerySelector(document, '.product-select__options') as HTMLSelectElement
select.addEventListener('change', () => {
  setQueryRangeParams('sort', select.value)
})
}