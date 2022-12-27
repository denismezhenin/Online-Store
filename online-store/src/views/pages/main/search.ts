import { tsQuerySelectorAll } from "../../components/helpers";
import productItems from "../../components/productJSON";
import { addItems } from "./items";

const searchOptions = ['category', 'brand']

export const searchItems = async (data: any) => {
    let filteredArr = data.slice()
    const totalOptionCategoryCount = createOptionObject(filteredArr, searchOptions[0], searchOptions[1])
    const searchParams = new URLSearchParams((`${location.hash}`).slice(1));

    if (searchParams.has('category')) {
        filteredArr = filterByValue('category', searchParams.getAll('category'), filteredArr)
    }
    if (searchParams.has('brand')) {
        filteredArr = filterByValue('brand', searchParams.getAll('brand'), filteredArr)
    }
    if (searchParams.has('price-min') && searchParams.has('price-max')) {
        let filtersArr = [searchParams.get('price-min')!, searchParams.get('price-max')!];
        filteredArr = filterByRange('price', filtersArr, filteredArr);
    }
    if (searchParams.has('stock-min') && searchParams.has('stock-max')) {
        let filtersArr = [searchParams.get('stock-min')!, searchParams.get('stock-max')!];
        filteredArr = filterByRange('stock', filtersArr, filteredArr);
    }
    if (searchParams.has('search')) {
        filteredArr = filterBySearch('brand', searchParams.get('search')!, filteredArr)
    }
    if (searchParams.has('sort')) {
        filteredArr = filterBySort(searchParams.get('sort')!, filteredArr)
    }

    const viewOptionCategoryCount = createOptionObject(filteredArr, searchOptions[0], searchOptions[1])
    setOptionCounts(totalOptionCategoryCount, viewOptionCategoryCount)
    addItems("products-list", filteredArr)
};

const filterByValue = (category: string, arrValues: string[], arr: any[]): any => {
    return arr.filter(item => arrValues.includes((item[category]).toLowerCase()))
}
const filterByRange = (category: string, arrValues: string[], arr: any[]): any => {
    return arr.filter(item => (arrValues[0] <= item[category]) && (arrValues[1] >= item[category]))
}
const filterBySearch = (category: string, str: string, arr: any[]): any => {
    return arr.filter(item => {
        for (let value of Object.values(item)) {
            if (typeof value === 'string' && (value).toLowerCase().startsWith(str)) {
                return true
            }
            if (typeof value === 'number' && String(value).startsWith(str)) {
                return true
            }
        }
    })
}

const filterBySort = (type: string, arr: any[]) => {
    switch(type) {
        case 'default':
            return arr;
            break;
        case 'price-high':
            return arr.sort((a, b) => a.price - b.price);
            break;
        case 'price-low':
            return arr.sort((a, b) => b.price - a.price);
            break;
        case 'rating-high':
            return arr.sort((a, b) => a.rating - b.rating);
            break;
        case 'rating-low':
            return arr.sort((a, b) => b.rating - a.rating);
            break;
    }
}

const createOptionObject = (array: any, option1: any, option2: any) => {
    return array.reduce((acc: any, item: any) => {
        acc[(item[option1]).toLocaleLowerCase()] = acc[(item[option1]).toLocaleLowerCase()] ? acc[(item[option1]).toLocaleLowerCase()] + 1 : 1;
        acc[(item[option2]).toLocaleLowerCase()] = acc[(item[option2]).toLocaleLowerCase()] ? acc[(item[option2]).toLocaleLowerCase()] + 1 : 1
        return acc
      }, {})
} 

const setOptionCounts = (totalObj: any, veiwObj: any) => {
    const li = tsQuerySelectorAll(document, '.selections-variants__item')
    li.forEach(item => {
        const el = item.children[0]
        const total = totalObj[el.id]
        const view = veiwObj[el.id] ? veiwObj[el.id] : 0
        item.children[2].textContent = `(${view}/${total})`
    })
}