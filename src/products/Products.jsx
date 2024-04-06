import React, { useEffect } from "react";
import useProducts from "../api/hooks/useProducts";
import { toggleShowEditProductModal } from "../redux/slices/products.slice";
import ProductsTable from "./components/ProductsTable";
import { useSelector, useDispatch } from "react-redux";
import { FormModal } from "../components";
import EditProductForm from "./components/EditProductForm";
function Products() {
  const dispatch = useDispatch();
  const { products, showEditProductModal, selectedProduct } = useSelector(
    (state) => state.products
  );
  const { handleFetchProducts } = useProducts();
  useEffect(() => {
    if (Object.keys(products).length === 0) {
      handleFetchProducts();
    }
  }, []);
  return (
    <div>
      <ProductsTable data={products} />
      <FormModal
        open={showEditProductModal}
        handleClose={() => dispatch(toggleShowEditProductModal())}
        title={`Edit ${selectedProduct?.name}`}
        maxWidth="md"
        fullScreen={true}
      >
        <EditProductForm />
      </FormModal>
    </div>
  );
}

export default Products;
