import { tsQuerySelectorAll, tsQuerySelector } from '../../components/helpers'

export const setListeners = (category: string) => {
  const list = tsQuerySelector(document, `.${category}`)
  list.addEventListener('click', () => {
    deleteQueryParams(category)
    tsQuerySelectorAll(list, 'input').forEach((item: any)=> {
      if(item.checked) {
        setQueryParams(`${category}`, item.id)
      }
    })
  })
}

export const setQueryParams = (category: string, item: string) => {
  const searchParams = new URLSearchParams((`${location.hash}`).slice(1));
  const paramsArr = searchParams.getAll(category)
  if (paramsArr.includes(`${item}`)) {
    return
  }
  searchParams.append(category, item)
  location.hash = '' + searchParams.toString();
}

export const setQueryRangeParams = (category: string, value: string) => {
  const searchParams = new URLSearchParams((`${location.hash}`).slice(1));
  searchParams.set(category, value)
  location.hash = '' + searchParams.toString();
}

export const deleteQueryParams = (category: string) => {
  const searchParams = new URLSearchParams((`${location.hash}`).slice(1));
  searchParams.delete(category)
  location.hash = '' + searchParams.toString();
}