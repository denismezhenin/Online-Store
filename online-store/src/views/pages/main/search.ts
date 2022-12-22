import productItems from "../../components/productJSON";
import { addItems } from "./items";

const searchOptions = ['category', 'brand']

export const searchItems = (data: any) => {
    let filteredArr = data.slice()

    const searchParams = new URLSearchParams((`${location.hash}`).slice(1));
    if(searchParams.has('category')) {
        filteredArr = filterByValue('category', searchParams.getAll('category'), filteredArr)
    }
    if(searchParams.has('brand')) {
        filteredArr = filterByValue('brand', searchParams.getAll('brand'), filteredArr)
    }
    if(searchParams.has('price-min') && searchParams.has('price-max')) {

        let filtersArr = [searchParams.get('price-min')!, searchParams.get('price-max')!];
        filteredArr = filterByRange('brand', filtersArr, filteredArr);
    }
    if(searchParams.has('stock-min') && searchParams.has('stock-max')) {

        let filtersArr = [searchParams.get('stock-min')!, searchParams.get('stock-max')!];
        filteredArr = filterByRange('brand', filtersArr, filteredArr);
    }
    if(searchParams.has('search')) {
        filteredArr = filterBySearch('brand', searchParams.get('search')!, filteredArr)
    }

    addItems("products-list", filteredArr)
};

const filterByValue = (category: string, arrValues: string[], arr: any[]): any => {
    return arr.filter(item => arrValues.includes((item[category]).toLowerCase()))
}
const filterByRange = (category: string, arrValues: string[], arr: any[]): any => {
    return arr.filter(item => arrValues[0] <= item.stock && arrValues[1] >= item.stock)
}
const filterBySearch = (category: string, str: string, arr: any[]): any => {

    return arr.filter(item => {
        for (let value of Object.values(item)) {
            if (typeof value === 'string' &&(value).toLowerCase().startsWith(str)) {
                console.log(value)
                return true
            }
        }
    })
}
