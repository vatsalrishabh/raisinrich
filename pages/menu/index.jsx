import React from "react";
import MenuWrapper from "../../components/product/MenuWrapper";
import api from "../../util/axios";

const Index = ({ categoryList, productList }) => {
  return (
    <div className="pt-10">
      <MenuWrapper categoryList={categoryList} productList={productList} />
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const category = await api.get(`/api/categories`);
    const product = await api.get(`/api/products`);
    return {
      props: {
        categoryList: category.data ? category.data : [],
        productList: product.data ? product.data : [],
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        categoryList: [],
        productList: [],
      },
    };
  }
};

export default Index;
