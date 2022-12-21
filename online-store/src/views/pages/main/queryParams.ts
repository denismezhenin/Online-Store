import { tsQuerySelectorAll, tsQuerySelector } from '../../components/helpers'

export const setListeners = () => {
  const category = tsQuerySelector(document, '.category')
  category.addEventListener('click', () => {
    tsQuerySelectorAll(category, 'input').forEach((item: any)=> {
      let url:any = new URL(`${location.href}`)
      let url2:any = (`${location.hash}`).slice(1)
      if(item.checked) {
        let a:any = new URL(`${location.href}`)
        // a = a.slice(2)
        // console.log(a)
        // console.log(a.hash.slice(2))
              // console.log(new URLSearchParams(a).toString())
              // console.log(new URLSearchParams(url).toString())
                    // console.log(url.href)
              // if(url.search) {
              //   console.log(1)
              // }
              // console.log(url.search)
              // if ()
        // url.searchParams.append('category', `${item.id}`);
        // url2.searchParams.append('category', `${item.id}`);
        const searchParams = new URLSearchParams(url2);
        // console.log(searchParams)
        const paramsArr = searchParams.getAll('category')
        if (paramsArr.includes(`${item.id}`)) {
          return
        }
        searchParams.append('category', `${item.id}`)
        // console.log(searchParams.get('category'))
                      // console.log(new URLSearchParams(url.hash).toString())
        // let b = new URLSearchParams((url.hash).slice(2))
        // searchParams.forEach((value, key) => {
        //   console.log(value, key);
        // })
        // console.log(new URLSearchParams(url.hash).get('category'))
        // console.log(b.get('category'))
        // console.log(url.search)
        // console.log(url.href)
        // console.log(url.search)
      // console.log(url.href)
      // console.log(url.hash)
      // console.log(url.pathname)
        location.hash = '' + searchParams.toString();
      }
      // console.log(url.href)
    })
  })
}



export const setQueryParams = () => {
  const url = location.pathname;
  
}