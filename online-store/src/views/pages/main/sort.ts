import { Query } from "../../components/constants"
import { tsQuerySelector } from "../../components/helpers"
import { setQueryParam } from "./queryParams"

 const setSortParam = () => {
  const select = tsQuerySelector<HTMLSelectElement>(document, '.product-select__options');
  select.addEventListener('change', () => {
  setQueryParam(Query.sort, select.value);
})
}
export default setSortParam