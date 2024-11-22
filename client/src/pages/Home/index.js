import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { Divider, message } from "antd";
import { GetProducts } from "../../apicalls/products";
import { useNavigate } from "react-router-dom";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import Filters from "./Filters";
import { useState } from "react";

function Home() {
  const [showFilters, setShowFilters] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    status: "approved",
    category: [],
    age: [],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(filters);
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.data);
        setFilteredProducts(response.data); // search bar
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [filters]);

  // Function to handle search
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  return (
    <div className="flex gap-5">
      {showFilters && (
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filters}
          setFilters={setFilters}
        />
      )}
      <div className="flex flex-col gap-3 w-full">
        <div className="flex gap-3">
          {!showFilters && (
            <MenuUnfoldOutlined
              className="text-xl cursor-pointer mb-2 hover:text-orange-500"
              onClick={() => setShowFilters(!showFilters)}
            />
          )}

          <input
            type="text"
            placeholder="Search Products here..."
            className="border6 w-full mb-2 h-14"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div
          className={`
        grid gap-5 ${showFilters ? "grid-cols-4" : "grid-cols-5"}
      `}
        >
          {filteredProducts.map((product) => {
            return (
              <div
                className="border3 rounded flex flex-col gap-5 pb-2 cursor-pointer story-card"
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <img src={product.images[0]} className="w-full h-64" alt="" />

                <div className="pl-2 flex flex-col gap-1">
                  <h1 className="text-lg text-orange-600 font-bold">
                    {product.name}
                  </h1>
                  <p className="text-sm text-gray-600">
                    {product.age} {product.age === 1 ? "year" : "years"} old
                  </p>
                  <Divider className="bg-gray-400" />
                  <span className="text-lg text-bold text-green-600">
                    ₹ {product.price}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
