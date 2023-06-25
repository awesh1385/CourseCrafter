import {Hero} from "./components/Hero";
import {FeatureProduct} from './components/FeatureProduct';
import {Testimonial} from "./components/Testimonial";
import {Faq} from "./components/Faq";
import { useTitle } from "../../hooks/useTitle";
export const HomePage = () => {
  useTitle("Access Latest Computer Science eBooks");
  return (
   <main>
   <Hero/>
   <FeatureProduct />
   <Testimonial/>
   <Faq/>
   </main>
  )
}
