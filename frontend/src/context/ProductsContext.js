import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";

const ProductsContext = createContext();

export const ProductContexProvider = ({ children }) => {
  const { currentUser, userContextLoading } = useUserContext();

  const [products, setProducts] = useState([]);

  const [productContextLoading, setProductContextLoading] = useState(true);

  const [loadingProducts, setLoadingProducts] = useState(true);
  const [filteredArray, setFilteredArray] = useState([]);

  // console.log("ProductContexProvider:isUpdeted", isUpdeted);

  useEffect(() => {
    setProductContextLoading(true);
    if (!userContextLoading) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(
            // "https://paint-exchange-fullstack-1.onrender.com/products",
            "http://localhost:8080/products",
            {
              headers: {
                Authorization: `Bearer ${currentUser.token}`,
              },
            }
          );

          const data = await response.data;

          setProducts(data);
          localStorage.setItem("products", JSON.stringify(data));
          setFilteredArray(data);
          setProductContextLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      if (currentUser) {
        fetchProducts();
      }
      return () => fetchProducts();
    } else {
      setProducts([]);
    }
  }, [currentUser, userContextLoading]);

  const Set_Products = (products) => {
    setProducts(products);
  };

  const Create_Product = async (product) => {
    setProducts([product, ...products]);
    setFilteredArray([product, ...products]);
  };

  const Update_Product = async (updatedProduct) => {
    const updatedProducts = products.map((product) => {
      if (product._id === updatedProduct._id) {
        return updatedProduct;
      } else {
        return product;
      }
    });
    setProducts(updatedProducts);
    setFilteredArray(updatedProducts);
  };

  const Delete_Product = async (id) => {
    const updatedProducts = products.filter((product) => product._id !== id);
    setProducts(updatedProducts);
    setFilteredArray(updatedProducts);
  };

  // console.log("Products-filteredArray", filteredArray);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setLoadingProducts(true);
    const newPacientes = products.filter((product) =>
      product.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredArray(newPacientes);
    setLoadingProducts(false);
  }, [searchValue]);

  return (
    <ProductsContext.Provider
      value={{
        setProducts,
        Set_Products,
        Create_Product,
        Update_Product,
        Delete_Product,
        products,
        productContextLoading,
        filteredArray,
        loadingProducts,
        setSearchValue,
        searchValue,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
