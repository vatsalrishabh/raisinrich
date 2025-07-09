import React from "react";
import MenuWrapper from "../../components/product/MenuWrapper";
import axios from "axios";

const Index = ({ categoryList, productList }) => {
  return (
    <div className="pt-10">
      <MenuWrapper categoryList={categoryList} productList={productList} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const category = await axios.get(
    `/api/categories`
  );
  const product = await axios.get(
    `/api/products`
  );
  return {
    props: {
      categoryList: category.data ? category.data : [],
      productList: product.data ? product.data : [],
    },
  };
};

export default Index;
