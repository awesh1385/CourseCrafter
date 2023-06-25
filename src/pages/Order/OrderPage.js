import {OrderSuccess} from "./components/OrderSuccess";
import {OrderFail} from "./components/OrderFail";
import { useLocation } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";


export const OrderPage = () => {
  useTitle("Order Summary")
    const {state}=useLocation(); //getting from checkout page navigate
  return (
  <main>{state.status ? <OrderSuccess data={state.data}/> : <OrderFail/>}</main>
  )
}
