import productItems from "../../components/productJSON";
import { addItems } from "./items";

const searchOptions = ['category', 'brand']

export const searchItems = (data: any) => {
    // let tempArr = data.slice()
    const arr = new Set() 
    const searchParams = new URLSearchParams((`${location.hash}`).slice(1));
    for (let value of searchOptions) {
        // console.log(searchParams.getAll(value))
        if (searchParams.has(value)) {
            const searchArr = searchParams.getAll(value);
            // console.log(value)
            for (let value2 of searchArr) {
                let tempArr: [object] = data.filter((item: any) => item[value] == value2) 
                console.log(...tempArr)
                arr.add(...tempArr)
                // addItems("products-list", data)
            }
        }
        console.log(arr)
    }
    // if (searchParams)
}