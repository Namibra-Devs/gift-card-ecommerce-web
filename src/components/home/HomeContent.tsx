import AvailableBrands from "./AvailableBrands";
import ProductCategories from "./ProductCategories";

const HomeContent = () => {
  return (
    <div className=" pb-5 pt-3">
      <ProductCategories />
      <AvailableBrands/>
    </div>
  );
};

export default HomeContent;
