import { serverURL } from "@/serverURL";
// import FilterSidebar from "@/components/FilterSidebar";
// import ProductCard from "@/components/ProductCard";

// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { setProducts } from "@/redux/productSlice";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const Products = () => {
//   const { products } = useSelector((store) => store.product);
//   const [allProducts, setAllProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");
//   const [brand, setBrand] = useState("All");
//   const [priceRange, setPriceRange] = useState([0, 999999]);
//   const [sortOrder, setSortOrder] = useState("");
//   const dispatch = useDispatch();

//   const getAllProducts = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${serverURL}/api/product/get`);

//       console.log(res.data); // check this

//       if (res.data.success) {
//         console.log(res.data.product); // check here
//         setAllProducts(res.data.product);
//         dispatch(setProducts(res.data.product));
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getAllProducts();
//   }, []);

//   useEffect(() => {
//     if (allProducts.length === 0) return;
//     let filtered = [...allProducts];
//     if (search.trim() !== "") {
//       filtered = filtered.filter((p) =>
//         p.productName?.toLowerCase().includes(search.toLowerCase()),
//       );
//     }
//     if (category !== "All") {
//       filtered = filtered.filter((p) => p.category === category);
//     }
//     if (brand !== "All") {
//       filtered = filtered.filter((p) => p.brand === brand);
//     }
//     filtered = filtered.filter(
//       (p) => p.productPrice >= priceRange[0] && p.productPrice <= priceRange[1],
//     );
//     if (sortOrder === "lowtohigh") {
//       filtered.sort((a, b) => a.productPrice - b.productPrice);
//     } else if (sortOrder === "hightolow") {
//       filtered.sort((a, b) => b.productPrice - a.productPrice);
//     }
//     dispatch(setProducts(filtered));
//   }, [search, brand, category, sortOrder, priceRange, allProducts, dispatch]);

//   return (
//     <div className="pt-20 pb-10">
//       <div className="max-w-7xl mx-auto flex gap-7">
//         {/* sidebar */}
//         <FilterSidebar
//           allProducts={allProducts}
//           priceRange={priceRange}
//           search={search}
//           setSearch={setSearch}
//           brand={brand}
//           setBrand={setBrand}
//           category={category}
//           setCategory={setCategory}
//           setPriceRange={setPriceRange}
//         />
//         {/* main product section  */}
//         <div className="flex flex-col flex-1">
//           <div className="flex justify-end mb-4">
//             <Select onValueChange={(value) => setSortOrder(value)}>
//               <SelectTrigger className="w-[200px]">
//                 <SelectValue placeholder="Sort by price" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectGroup>
//                   <SelectItem value="lowtohigh">Price low to high</SelectItem>
//                   <SelectItem value="hightolow">Price high to low</SelectItem>
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//           </div>
//           {/* product grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
//             {products &&
//               products.map((product) => (
//                 <ProductCard
//                   key={product._id}
//                   product={product}
//                   loading={loading}
//                 />
//               ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Products;
import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { setProducts } from "@/redux/productSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const { products } = useSelector((store) => store.product);

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 999999]);
  const [sortOrder, setSortOrder] = useState("");

  const dispatch = useDispatch();

  const getAllProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${serverURL}/api/product/get`);

      if (res.data.success) {
        setAllProducts(res.data.product);
        dispatch(setProducts(res.data.product));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (allProducts.length === 0) return;

    let filtered = [...allProducts];

    if (search && search.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.productName?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category !== "All") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (brand !== "All") {
      filtered = filtered.filter((p) => p.brand === brand);
    }

    filtered = filtered.filter(
      (p) => p.productPrice >= priceRange[0] && p.productPrice <= priceRange[1],
    );

    if (sortOrder === "lowtohigh") {
      filtered.sort((a, b) => a.productPrice - b.productPrice);
    } else if (sortOrder === "hightolow") {
      filtered.sort((a, b) => b.productPrice - a.productPrice);
    }

    dispatch(setProducts(filtered));
  }, [search, brand, category, sortOrder, priceRange, allProducts, dispatch]);

  return (
    <div className="pt-24 pb-10">
      <div
        className="
        max-w-7xl mx-auto
        px-4
        flex flex-col md:flex-row
        gap-6
      "
      >
        {/* sidebar */}
        <FilterSidebar
          allProducts={allProducts}
          priceRange={priceRange}
          search={search}
          setSearch={setSearch}
          brand={brand}
          setBrand={setBrand}
          category={category}
          setCategory={setCategory}
          setPriceRange={setPriceRange}
        />

        {/* main section */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-center md:justify-end mb-5">
            <Select onValueChange={(value) => setSortOrder(value)}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Sort by price" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="lowtohigh">Price low to high</SelectItem>

                  <SelectItem value="hightolow">Price high to low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* grid */}
          <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-6
            animate-in slide-in-from-bottom-8 fade-in duration-700 ease-out
          "
          >
            {products &&
              products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  loading={loading}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
