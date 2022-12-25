import productItems from "../../components/productJSON";
import { addItems } from "./items";

const searchOptions = ['category', 'brand']

export const searchItems = async (data: any) => {
    let filteredArr = data.slice()
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
            if (typeof value === 'string' &&(value).toLowerCase().startsWith(str)) {
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
    // return arr.sort((item)
}