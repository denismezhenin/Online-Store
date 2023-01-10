// import {filterByValue} from '../views/pages/main/search'
import { IProduct } from '../views/components/constants';
import productItems from '../views/components/productItems'
import { Query } from '../views/components/constants'
import {filterByValue, filterBySort, filterBySearch, filterByRange} from './functions';


describe('When search input get value "1499"', () => {
  it('returns the array of 2 products', () => {
    const result = filterBySearch('1499', productItems.products)
    const expected = [
      {
        "id": 7,
        "title": "Samsung Galaxy Book",
        "description": "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
        "price": 1499,
        "discountPercentage": 4.15,
        "rating": 4.25,
        "stock": 50,
        "brand": "Samsung",
        "category": "laptops",
        "thumbnail": "https://i.dummyjson.com/data/products/7/thumbnail.jpg",
        "images": [
        "https://i.dummyjson.com/data/products/7/1.jpg",
        "https://i.dummyjson.com/data/products/7/2.jpg",
        "https://i.dummyjson.com/data/products/7/3.jpg",
        "https://i.dummyjson.com/data/products/7/thumbnail.jpg"
        ]
        },
        {
          "id": 8,
          "title": "Microsoft Surface Laptop 4",
          "description": "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
          "price": 1499,
          "discountPercentage": 10.23,
          "rating": 4.43,
          "stock": 68,
          "brand": "Microsoft Surface",
          "category": "laptops",
          "thumbnail": "https://i.dummyjson.com/data/products/8/thumbnail.jpg",
          "images": [
          "https://i.dummyjson.com/data/products/8/1.jpg",
          "https://i.dummyjson.com/data/products/8/2.jpg",
          "https://i.dummyjson.com/data/products/8/3.jpg",
          "https://i.dummyjson.com/data/products/8/4.jpg",
          "https://i.dummyjson.com/data/products/8/thumbnail.jpg"
          ]
          },]
    expect(result).toEqual(expected)
  })
})


describe('When search by two brands', () => {
  it('returns the array of all products taht fit criteria', () => {
    const result = (filterByValue(Query.brand, ['apple', 'samsung'], productItems.products))
    const expected = (productItems.products.filter(product => ['apple', 'samsung'].includes(String(product[Query.brand]).toLowerCase())))

    expect(result).toEqual(expected)
  })
})

describe('When search by one brands', () => {
  it('returns the array of one product taht fit criteria', () => {
    const result = (filterByValue(Query.brand, ['huawei'], productItems.products))
    const expected = [    {
      "id": 5,
      "title": "Huawei P30",
      "description": "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
      "price": 499,
      "discountPercentage": 10.58,
      "rating": 4.09,
      "stock": 32,
      "brand": "Huawei",
      "category": "smartphones",
      "thumbnail": "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
      "images": [
      "https://i.dummyjson.com/data/products/5/1.jpg",
      "https://i.dummyjson.com/data/products/5/2.jpg",
      "https://i.dummyjson.com/data/products/5/3.jpg"
      ]
      },]

    expect(result).toEqual(expected)
  })
})

describe('When sort by price descending first product', () => {
  it('equal product with the heightest price', () => {
    const result = filterBySort(Query.priceDesc, productItems.products)![0]
    const expected = {
      "id": 6,
      "title": "MacBook Pro",
      "description": "MacBook Pro 2021 with mini-LED display may launch between September, November",
      "price": 1749,
      "discountPercentage": 11.02,
      "rating": 4.57,
      "stock": 83,
      "brand": "Apple",
      "category": "laptops",
      "thumbnail": "https://i.dummyjson.com/data/products/6/thumbnail.png",
      "images": [
      "https://i.dummyjson.com/data/products/6/1.png",
      "https://i.dummyjson.com/data/products/6/2.jpg",
      "https://i.dummyjson.com/data/products/6/3.png",
      "https://i.dummyjson.com/data/products/6/4.jpg"
      ]
      }

    expect(result).toEqual(expected)
  })
})

describe('When sort by rating descending first product', () => {
  it('equal product with the heightest rating', () => {
    const result = filterBySort(Query.ratingDesc, productItems.products)![0]
    const expected = productItems.products.sort((a, b) => b.rating - a.rating)[0]
    expect(result).toEqual(expected)
  })
})

describe('When given 2 numbers', () => {
  it('returns the sum of those 2 numbers', () => {
    const result = filterBySort(Query.default, productItems.products)
    const expected = productItems.products
    expect(result).toEqual(expected)
  })
})



describe('When given 2 numbers', () => {
  it('returns the sum of those 2 numbers', () => {
    const result = filterBySearch('Microsoft Surface Laptop 4', productItems.products)
    const expected = [
      {
      "id": 8,
      "title": "Microsoft Surface Laptop 4",
      "description": "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
      "price": 1499,
      "discountPercentage": 10.23,
      "rating": 4.43,
      "stock": 68,
      "brand": "Microsoft Surface",
      "category": "laptops",
      "thumbnail": "https://i.dummyjson.com/data/products/8/thumbnail.jpg",
      "images": [
      "https://i.dummyjson.com/data/products/8/1.jpg",
      "https://i.dummyjson.com/data/products/8/2.jpg",
      "https://i.dummyjson.com/data/products/8/3.jpg",
      "https://i.dummyjson.com/data/products/8/4.jpg",
      "https://i.dummyjson.com/data/products/8/thumbnail.jpg"
      ]
      }]
    expect(result).toEqual(expected)
  })
})

describe('When given 2 numbers', () => {
  it('returns the sum of those 2 numbers', () => {
    const result = filterBySearch('fragrances', productItems.products)
    const expected = filterByValue(Query.category, ['fragrances'], productItems.products)
    expect(result).toEqual(expected)
  })
})

describe('When given 2 numbers', () => {
  it('returns the sum of those 2 numbers', () => {
    const result = filterByRange(Query.price, ['10', '12'], productItems.products)
    const expected = [
      {
        "id": 17,
        "title": "Tree Oil 30ml",
        "description": "Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria,",
        "price": 12,
        "discountPercentage": 4.09,
        "rating": 4.52,
        "stock": 78,
        "brand": "Hemani Tea",
        "category": "skincare",
        "thumbnail": "https://i.dummyjson.com/data/products/17/thumbnail.jpg",
        "images": [
        "https://i.dummyjson.com/data/products/17/1.jpg",
        "https://i.dummyjson.com/data/products/17/2.jpg",
        "https://i.dummyjson.com/data/products/17/3.jpg",
        "https://i.dummyjson.com/data/products/17/thumbnail.jpg"
        ]
        },
        {
          "id": 52,
          "title": "FREE FIRE T Shirt",
          "description": "quality and professional print - It doesn't just look high quality, it is high quality.",
          "price": 10,
          "discountPercentage": 14.72,
          "rating": 4.52,
          "stock": 128,
          "brand": "FREE FIRE",
          "category": "mens-shirts",
          "thumbnail": "https://i.dummyjson.com/data/products/52/thumbnail.jpg",
          "images": [
          "https://i.dummyjson.com/data/products/52/1.png",
          "https://i.dummyjson.com/data/products/52/2.png",
          "https://i.dummyjson.com/data/products/52/3.jpg",
          "https://i.dummyjson.com/data/products/52/4.jpg",
          "https://i.dummyjson.com/data/products/52/thumbnail.jpg"
          ]
          },]
    expect(result).toEqual(expected)
  })
})

describe('When given 2 numbers', () => {
  it('returns the sum of those 2 numbers', () => {
    const result = filterByRange(Query.stock, ['101', '105'], productItems.products)
    const expected = [
      {
        "id": 15,
        "title": "Eau De Perfume Spray",
        "description": "Genuine  Al-Rehab spray perfume from UAE/Saudi Arabia/Yemen High Quality",
        "price": 30,
        "discountPercentage": 10.99,
        "rating": 4.7,
        "stock": 105,
        "brand": "Lord - Al-Rehab",
        "category": "fragrances",
        "thumbnail": "https://i.dummyjson.com/data/products/15/thumbnail.jpg",
        "images": [
        "https://i.dummyjson.com/data/products/15/1.jpg",
        "https://i.dummyjson.com/data/products/15/2.jpg",
        "https://i.dummyjson.com/data/products/15/3.jpg",
        "https://i.dummyjson.com/data/products/15/4.jpg",
        "https://i.dummyjson.com/data/products/15/thumbnail.jpg"
        ]
        },
      {
        "id": 73,
        "title": "Fancy hand clutch",
        "description": "This fashion is designed to add a charming effect to your casual outfit. This Bag is made of synthetic leather.",
        "price": 44,
        "discountPercentage": 10.39,
        "rating": 4.18,
        "stock": 101,
        "brand": "Bracelet",
        "category": "womens-bags",
        "thumbnail": "https://i.dummyjson.com/data/products/73/thumbnail.jpg",
        "images": [
        "https://i.dummyjson.com/data/products/73/1.jpg",
        "https://i.dummyjson.com/data/products/73/2.webp",
        "https://i.dummyjson.com/data/products/73/3.jpg",
        "https://i.dummyjson.com/data/products/73/thumbnail.jpg"
        ]
        },
    ]
    expect(result).toEqual(expected)
  })
})


