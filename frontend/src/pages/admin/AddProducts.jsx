import { serverURL } from "@/serverURL";
// import ImageUpload from "@/components/ImageUpload";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { setProducts } from "@/redux/productSlice";
// import axios from "axios";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";

// const AddProducts = () => {
//   const [productData, setProductData] = useState({
//     productName: "",
//     productPrice: 0,
//     productDesc: "",
//     productImg: [],
//     brand: "",
//     category: "",
//   });
//   const accessToken = localStorage.getItem("accessToken");
//   const products = useSelector((store) => store.product.products ?? []);
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();

//   const handleChange = async (e) => {
//     const { name, value } = e.target;
//     setProductData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("productName", productData.productName);
//     formData.append("productPrice", productData.productPrice);
//     formData.append("productDesc", productData.productDesc);
//     formData.append("brand", productData.brand);
//     formData.append("category", productData.category);

//     if (productData.productImg.length === 0) {
//       toast.error("Please select at least one image");
//       return;
//     }
//     productData.productImg.forEach((img) => {
//       formData.append("files", img);
//     });
//     try {
//       if (!accessToken) {
//         toast.error("Admin token missing. Please log in again.");
//         return;
//       }

//       setLoading(true);
//       const res = await axios.post(
//         `${serverURL}/api/product/add`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         },
//       );

//       if (res.data.success) {
//         dispatch(setProducts([...products, res.data.product]));
//         toast.success(res.data.message);
//         setProductData({
//           productName: "",
//           productPrice: 0,
//           productDesc: "",
//           productImg: [],
//           brand: "",
//           category: "",
//         });
//       } else {
//         toast.error(res.data.message || "Unable to add product");
//       }
//     } catch (error) {
//       console.error(error.response || error.message || error);
//       toast.error(
//         error.response?.data?.message ||
//           "Failed to add product. Check your input and auth.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="pl-[350px] py-20 pr-20 mx-auto px-4 bg-gray-100">
//       <Card className="w-full my-20">
//         <CardHeader>
//           <CardTitle>Add Product</CardTitle>
//           <CardDescription>Enter product details below</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col gap-2">
//             <div className="grid gap-2">
//               <Label>Product Name</Label>
//               <Input
//                 type="text"
//                 name="productName"
//                 value={productData.productName}
//                 onChange={handleChange}
//                 placeholder="iPhone 15 pro max"
//                 required
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label>Product Price</Label>
//               <Input
//                 type="number"
//                 name="productPrice"
//                 value={productData.productPrice}
//                 onChange={handleChange}
//                 placeholder="₹1,00,000"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="grid gap-2">
//                 <Label>Brand</Label>
//                 <Input
//                   type="text"
//                   name="brand"
//                   value={productData.brand}
//                   onChange={handleChange}
//                   placeholder="iPhone"
//                   required
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <Label>Category</Label>
//                 <Input
//                   type="text"
//                   name="category"
//                   value={productData.category}
//                   onChange={handleChange}
//                   placeholder="Mobile"
//                   required
//                 />
//               </div>
//             </div>
//             <div className="grid gap-2">
//               <div className="flex items-center">
//                 <Label>Description</Label>
//               </div>
//               <Textarea
//                 name="productDesc"
//                 value={productData.productDesc}
//                 onChange={handleChange}
//                 placeholder="Description"
//               />
//             </div>
//             <ImageUpload
//               productData={productData}
//               setProductData={setProductData}
//             />
//           </div>
//           <CardFooter className="flex-col gap-2">
//             <Button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="w-full mt-5 cursor-pointer bg-red-500 hover:bg-red-400 transition"
//               type="submit"
//             >
//               {loading ? (
//                 <span className="flex gap-1 items-center">
//                   <Loader2 className="animate-spin" />
//                   Adding...
//                 </span>
//               ) : (
//                 "Add"
//               )}
//             </Button>
//           </CardFooter>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AddProducts;
import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { setProducts } from "@/redux/productSlice";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const AddProducts = () => {
  const [productData, setProductData] = useState({
    productName: "",
    productPrice: 0,
    productDesc: "",
    productImg: [],
    brand: "",
    category: "",
  });

  const accessToken = localStorage.getItem("accessToken");
  const products = useSelector((store) => store.product.products ?? []);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", productData.productName);
    formData.append("productPrice", productData.productPrice);
    formData.append("productDesc", productData.productDesc);
    formData.append("brand", productData.brand);
    formData.append("category", productData.category);

    if (productData.productImg.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    productData.productImg.forEach((img) => {
      formData.append("files", img);
    });

    try {
      if (!accessToken) {
        toast.error("Admin token missing. Please log in again.");
        return;
      }

      setLoading(true);

      const res = await axios.post(
        `${serverURL}/api/product/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        dispatch(setProducts([...products, res.data.product]));
        toast.success(res.data.message);

        setProductData({
          productName: "",
          productPrice: 0,
          productDesc: "",
          productImg: [],
          brand: "",
          category: "",
        });
      } else {
        toast.error(res.data.message || "Unable to add product");
      }
    } catch (error) {
      console.error(error.response || error.message || error);

      toast.error(
        error.response?.data?.message ||
          "Failed to add product. Check your input and auth.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      px-4 sm:px-6 lg:px-8
      pt-24 pb-10
      bg-gray-50
      min-h-screen
    "
    >
      <Card
        className="
        w-full
        max-w-5xl
        mx-auto
        rounded-2xl
        shadow-lg
        border border-gray-100
      "
      >
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add Product</CardTitle>

          <CardDescription>Enter product details below</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-5">
            {/* product name */}
            <div className="grid gap-2">
              <Label>Product Name</Label>

              <Input
                type="text"
                name="productName"
                value={productData.productName}
                onChange={handleChange}
                placeholder="iPhone 15 pro max"
                required
                className="
                rounded-xl
                focus:ring-2 focus:ring-red-500
              "
              />
            </div>

            {/* product price */}
            <div className="grid gap-2">
              <Label>Product Price</Label>

              <Input
                type="number"
                name="productPrice"
                value={productData.productPrice}
                onChange={handleChange}
                placeholder="₹10000"
                required
                className="
                rounded-xl
                focus:ring-2 focus:ring-red-500
              "
              />
            </div>

            {/* brand + category */}
            <div
              className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-4
            "
            >
              <div className="grid gap-2">
                <Label>Brand</Label>

                <Input
                  type="text"
                  name="brand"
                  value={productData.brand}
                  onChange={handleChange}
                  placeholder="Apple"
                  required
                  className="
                  rounded-xl
                  focus:ring-2 focus:ring-red-500
                "
                />
              </div>

              <div className="grid gap-2">
                <Label>Category</Label>

                <Input
                  type="text"
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  placeholder="Mobile"
                  required
                  className="
                  rounded-xl
                  focus:ring-2 focus:ring-red-500
                "
                />
              </div>
            </div>

            {/* description */}
            <div className="grid gap-2">
              <Label>Description</Label>

              <Textarea
                name="productDesc"
                value={productData.productDesc}
                onChange={handleChange}
                placeholder="Description"
                className="
                rounded-xl
                min-h-[120px]
                focus:ring-2 focus:ring-red-500
              "
              />
            </div>

            {/* image upload */}
            <div
              className="
              p-4
              rounded-2xl
              border border-dashed border-red-200
              bg-red-50/40
            "
            >
              <ImageUpload
                productData={productData}
                setProductData={setProductData}
              />
            </div>
          </div>

          <CardFooter className="flex-col gap-2 px-0">
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="
              w-full mt-6
              cursor-pointer
              bg-red-500 hover:bg-red-400
              rounded-xl
              h-11
              transition-all
            "
              type="submit"
            >
              {loading ? (
                <span className="flex gap-2 items-center">
                  <Loader2 className="animate-spin" />
                  Adding...
                </span>
              ) : (
                "Add Product"
              )}
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProducts;
