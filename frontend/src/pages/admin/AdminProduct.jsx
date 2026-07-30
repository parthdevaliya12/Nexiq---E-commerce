// import { Input } from "@/components/ui/input";
// import { Edit, Search, Trash2 } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useDispatch, useSelector } from "react-redux";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import ImageUpload from "@/components/ImageUpload";
// import { useState } from "react";
// import axios from "axios";
// import { toast } from "sonner";
// import { setProducts } from "@/redux/productSlice";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";

// const AdminProduct = () => {
//   const [editProduct, setEditProduct] = useState(null);
//   const [open, setOpen] = useState(false);
//   const { products } = useSelector((store) => store.product);
//   const accessToken = localStorage.getItem("accessToken");
//   const [search, setSearch] = useState("");
//   const [sortOrder, setSortOrder] = useState("");

//   const dispatch = useDispatch();

//   let filterProduct = products.filter(
//     (product) =>
//       product.productName.toLowerCase().includes(search.toLowerCase()) ||
//       product.brand.toLowerCase().includes(search.toLowerCase()) ||
//       product.category.toLowerCase().includes(search.toLowerCase()),
//   );

//   if (sortOrder === "lowtohigh") {
//     filterProduct = [...filterProduct].sort(
//       (a, b) => a.productPrice - b.productPrice,
//     );
//   }
//   if (sortOrder === "hightolow") {
//     filterProduct = [...filterProduct].sort(
//       (a, b) => b.productPrice - a.productPrice,
//     );
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditProduct((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("productName", editProduct.productName);
//     formData.append("productPrice", editProduct.productPrice);
//     formData.append("productDesc", editProduct.productDesc);
//     formData.append("brand", editProduct.brand);
//     formData.append("category", editProduct.category);

//     //add existing image public_id
//     const existingImage = editProduct.productImg
//       .filter((img) => !(img instanceof File) && img.public_id)
//       .map((img) => img.public_id);
//     formData.append("existingImage", JSON.stringify(existingImage));

//     //add new files
//     editProduct.productImg
//       .filter((img) => img instanceof File)
//       .forEach((file) => {
//         formData.append("files", file);
//       });

//     try {
//       const res = await axios.put(
//         `http://localhost:8000/api/product/update/${editProduct._id}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         },
//       );
//       if (res.data.success) {
//         toast.success(res.data.message);

//         const updateProduct = products.map((p) =>
//           p._id === editProduct._id ? res.data.product : p,
//         );
//         dispatch(setProducts(updateProduct));
//         setOpen(false);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleRemove = async (productId) => {
//     try {
//       const remainingProduct = products.filter(
//         (product) => product._id !== productId,
//       );
//       const res = await axios.delete(
//         `http://localhost:8000/api/product/delete/${productId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         },
//       );
//       if (res.data.success) {
//         toast.success(res.data.message);
//         dispatch(setProducts(remainingProduct));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="pl-[350px] py-20 pr-20 flex flex-col gap-3 min-h-screen bg-gray-100">
//       <div className="flex justify-between">
//         <div className="relative bg-white rounded-lg">
//           <Input
//             type="text"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search"
//             className="w-[400px] items-center"
//           />
//           <Search className="absolute right-3 top-1 text-gray-500" />
//         </div>
//         <Select onValueChange={(value) => setSortOrder(value)}>
//           <SelectTrigger className="w-[200px] bg-white">
//             <SelectValue placeholder="Sort by price" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               <SelectItem value="lowtohigh">Low to high</SelectItem>
//               <SelectItem value="hightolow">High to low</SelectItem>
//             </SelectGroup>
//           </SelectContent>
//         </Select>
//       </div>
//       {filterProduct.map((product, index) => {
//         return (
//           <Card key={index} className="px-4">
//             <div className="flex justify-between items-center">
//               <div className="flex items-center gap-2">
//                 <img
//                   src={product?.productImg[0].url}
//                   alt=""
//                   className="w-25 h-25"
//                 />
//                 <h1 className="font-bold w-96 text-gray-700">
//                   {product.productName}
//                 </h1>
//               </div>
//               <h1 className="font-semibold text-gray-800">
//                 ₹{product.productPrice}
//               </h1>
//               <div className="flex gap-3">
//                 <Dialog open={open} onOpenChange={setOpen}>
//                   <DialogTrigger asChild>
//                     <Edit
//                       onClick={() => {
//                         (setOpen(true), setEditProduct(product));
//                       }}
//                       className="text-green-500 cursor-pointer"
//                     />
//                   </DialogTrigger>
//                   <DialogContent className="sm:max-w-[625px] max-h-[740px] overflow-y-scroll">
//                     <DialogHeader>
//                       <DialogTitle>Edit product</DialogTitle>
//                       <DialogDescription>
//                         Make changes to your product here. Click save when
//                         you&apos;re done.
//                       </DialogDescription>
//                     </DialogHeader>
//                     <div className="flex flex-col gap-2">
//                       <div className="grid gap-2">
//                         <Label htmlFor="name-1">Product Name</Label>
//                         <Input
//                           type="text"
//                           value={editProduct?.productName}
//                           onChange={handleChange}
//                           name="productName"
//                           placeholder="iPhone 12"
//                           required
//                         />
//                       </div>
//                       <div className="grid gap-2">
//                         <Label htmlFor="name-1">Product Price</Label>
//                         <Input
//                           type="number"
//                           name="productPrice"
//                           value={editProduct?.productPrice}
//                           onChange={handleChange}
//                           placeholder="₹67122"
//                           required
//                         />
//                       </div>
//                       <div className="grid grid-cols-2 gap-2">
//                         <div className="grid gap-2">
//                           <Label htmlFor="name-1">Brand</Label>
//                           <Input
//                             type="text"
//                             name="brand"
//                             value={editProduct?.brand}
//                             onChange={handleChange}
//                             placeholder="iPhone"
//                             required
//                           />
//                         </div>
//                         <div className="grid gap-2">
//                           <Label htmlFor="name-1">Category</Label>
//                           <Input
//                             type="text"
//                             name="category"
//                             value={editProduct?.category}
//                             onChange={handleChange}
//                             placeholder="Smartphone"
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="grid gap-2">
//                         <div className="flex items-center">
//                           <Label>Description</Label>
//                         </div>
//                         <Textarea
//                           placeholder="Description"
//                           value={editProduct?.productDesc}
//                           onChange={handleChange}
//                           name="productDesc"
//                           required
//                         />
//                       </div>
//                       <ImageUpload
//                         productData={editProduct}
//                         setProductData={setEditProduct}
//                       />
//                     </div>
//                     <DialogFooter>
//                       <DialogClose asChild>
//                         <Button variant="outline">Cancel</Button>
//                       </DialogClose>
//                       <Button
//                         onClick={handleSave}
//                         className="bg-red-500 hover:bg-red-400 transition"
//                         type="submit"
//                       >
//                         Save changes
//                       </Button>
//                     </DialogFooter>
//                   </DialogContent>
//                 </Dialog>

//                 <AlertDialog>
//                   <AlertDialogTrigger asChild>
//                     <Trash2 className="text-red-500 cursor-pointer" />
//                   </AlertDialogTrigger>
//                   <AlertDialogContent>
//                     <AlertDialogHeader>
//                       <AlertDialogTitle>
//                         Are you absolutely sure?
//                       </AlertDialogTitle>
//                       <AlertDialogDescription>
//                         This action cannot be undone. This will permanently
//                         delete your product.
//                       </AlertDialogDescription>
//                     </AlertDialogHeader>
//                     <AlertDialogFooter>
//                       <AlertDialogCancel>Cancel</AlertDialogCancel>
//                       <AlertDialogAction
//                         onClick={() => handleRemove(product._id)}
//                       >
//                         Continue
//                       </AlertDialogAction>
//                     </AlertDialogFooter>
//                   </AlertDialogContent>
//                 </AlertDialog>
//               </div>
//             </div>
//           </Card>
//         );
//       })}
//     </div>
//   );
// };

// export default AdminProduct;
import { Input } from "@/components/ui/input";
import { Edit, Search, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ImageUpload";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { setProducts } from "@/redux/productSlice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AdminProduct = () => {
  const [editProduct, setEditProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const { products } = useSelector((store) => store.product);
  const accessToken = localStorage.getItem("accessToken");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const dispatch = useDispatch();

  let filterProduct = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(search.toLowerCase()) ||
      product.brand.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase()),
  );

  if (sortOrder === "lowtohigh") {
    filterProduct = [...filterProduct].sort(
      (a, b) => a.productPrice - b.productPrice,
    );
  }

  if (sortOrder === "hightolow") {
    filterProduct = [...filterProduct].sort(
      (a, b) => b.productPrice - a.productPrice,
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", editProduct.productName);
    formData.append("productPrice", editProduct.productPrice);
    formData.append("productDesc", editProduct.productDesc);
    formData.append("brand", editProduct.brand);
    formData.append("category", editProduct.category);

    const existingImage = editProduct.productImg
      .filter((img) => !(img instanceof File) && img.public_id)
      .map((img) => img.public_id);

    formData.append("existingImage", JSON.stringify(existingImage));

    editProduct.productImg
      .filter((img) => img instanceof File)
      .forEach((file) => {
        formData.append("files", file);
      });

    try {
      const res = await axios.put(
        `http://localhost:8000/api/product/update/${editProduct._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);

        const updateProduct = products.map((p) =>
          p._id === editProduct._id ? res.data.product : p,
        );

        dispatch(setProducts(updateProduct));
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const remainingProduct = products.filter(
        (product) => product._id !== productId,
      );

      const res = await axios.delete(
        `http://localhost:8000/api/product/delete/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setProducts(remainingProduct));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="
      px-4 sm:px-6 lg:px-8
      pt-24 pb-10
      flex flex-col gap-5
      min-h-screen bg-gray-50
    "
    >
      {/* TOP SECTION */}
      <div
        className="
        flex flex-col md:flex-row
        gap-4 md:justify-between
      "
      >
        <div className="relative bg-white rounded-xl w-full md:w-[400px]">
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="pr-10 rounded-xl"
          />

          <Search className="absolute right-3 top-1 text-gray-500" />
        </div>

        <Select onValueChange={(value) => setSortOrder(value)}>
          <SelectTrigger className="w-full md:w-[220px] rounded-xl bg-white">
            <SelectValue placeholder="Sort by price" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value="lowtohigh">Low to high</SelectItem>
              <SelectItem value="hightolow">High to low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* PRODUCT LIST */}
      {filterProduct.map((product, index) => {
        return (
          <Card
            key={index}
            className="
            p-4 rounded-2xl
            shadow-sm
            hover:shadow-md
            transition-all
          "
          >
            <div
              className="
              flex flex-col md:flex-row
              gap-4 md:items-center
              md:justify-between
            "
            >
              {/* LEFT */}
              <div className="flex items-center gap-4 flex-1">
                <img
                  src={product?.productImg[0].url}
                  alt=""
                  className="
                  w-20 h-20
                  rounded-xl
                  object-cover
                  border
                "
                />

                <div>
                  <h1
                    className="
                    font-bold
                    text-gray-700
                    line-clamp-2
                  "
                  >
                    {product.productName}
                  </h1>

                  <p className="text-sm text-gray-500 mt-1">{product.brand}</p>
                </div>
              </div>

              {/* PRICE */}
              <h1 className="font-semibold text-gray-800">
                ₹{product.productPrice}
              </h1>

              {/* ACTIONS */}
              <div className="flex gap-4">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Edit
                      onClick={() => {
                        setOpen(true);
                        setEditProduct(product);
                      }}
                      className="text-green-500 cursor-pointer"
                    />
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit product</DialogTitle>

                      <DialogDescription>
                        Make changes to your product here.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-4">
                      <div className="grid gap-2">
                        <Label>Product Name</Label>

                        <Input
                          type="text"
                          value={editProduct?.productName}
                          onChange={handleChange}
                          name="productName"
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label>Product Price</Label>

                        <Input
                          type="number"
                          name="productPrice"
                          value={editProduct?.productPrice}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="grid gap-2">
                          <Label>Brand</Label>

                          <Input
                            type="text"
                            name="brand"
                            value={editProduct?.brand}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label>Category</Label>

                          <Input
                            type="text"
                            name="category"
                            value={editProduct?.category}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <Label>Description</Label>

                        <Textarea
                          value={editProduct?.productDesc}
                          onChange={handleChange}
                          name="productDesc"
                        />
                      </div>

                      <ImageUpload
                        productData={editProduct}
                        setProductData={setEditProduct}
                      />
                    </div>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>

                      <Button
                        onClick={handleSave}
                        className="bg-red-500 hover:bg-red-400 transition"
                        type="submit"
                      >
                        Save changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Trash2 className="text-red-500 cursor-pointer" />
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>

                      <AlertDialogDescription>
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>

                      <AlertDialogAction className="bg-red-500 hover:bg-red-400 transition"
                        onClick={() => handleRemove(product._id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default AdminProduct;
