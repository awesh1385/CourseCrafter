import { createContext, useContext, useReducer } from "react";
import { filterReducer } from "../reducers";

const filterInitialState = {
  //step1
  productList: [],
  onlyInStock: false,
  bestSellerOnly: false,
  sortBy: null,
  ratings: null,
};

const FilterContext = createContext(filterInitialState); //step2

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, filterInitialState); //step7

  //step 8 is to create funcitons
  function initialProductList(products) {
    dispatch({
      type: "PRODUCT_LIST",
      payload: {
        products,
      },
    });
  }


  function bestSeller(products) {
    return state.bestSellerOnly
      ? products.filter((product) => product.best_seller === true)
      : products;
  }


  function inStock(products) {
    return state.onlyInStock
      ? products.filter((product) => product.in_stock === true)
      : products;
  }

  function sort(products) {
    if (state.sortBy === "lowtohigh") {
      return products.sort((a, b) => Number(a.price) - Number(b.price));
    }
    if (state.sortBy === "hightolow") {
      return products.sort((a, b) => Number(b.price) - Number(a.price));
    }
    return products;
  }


  function rating(products) {
    if (state.ratings === "4STARSABOVE") {
      return products.filter((product) => product.rating >= 4);
    }
    if (state.ratings === "3STARSABOVE") {
      return products.filter((product) => product.rating >= 3);
    }
    if (state.ratings === "2STARSABOVE") {
      return products.filter((product) => product.rating >= 2);
    }
    if (state.ratings=== "1STARSABOVE") {
      return products.filter((product) => product.rating >= 1);
    }
    return products;
  }


  //i will give true false contion in fun so if the user clicked the filter then i will set to true or else it will give default list.
  const filteredProductList = rating(sort(inStock(bestSeller(state.productList)))); 


  //step3 children is app.js
  const value = {
    state,
    dispatch,
    products: filteredProductList,
    initialProductList,
  };
  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

//step5 in on index.js we have to cover App in FilterProvider so that all files can access the values

export const useFilter = () => useContext(FilterContext); //step 5
