// import Breadcrums from "@/components/Breadcrums";
// import ProductDesc from "@/components/ProductDesc";
// import ProductImg from "@/components/ProductImg";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

// const SingleProducts = () => {
//   const params = useParams();
//   const productId = params.id;
//   const { products } = useSelector((store) => store.product);
//   const product = products.find((item) => item._id === productId);
//   return (
//     <div className="p-20 py-10 max-w-7xl mx-auto">
//       <Breadcrums product={product} />
//       <div className="m-10 grid grid-cols-2 items-start">
//         <ProductImg images={product.productImg} />
//         <ProductDesc product={product} />
//       </div>
//     </div>
//   );
// };

// export default SingleProducts;
import Breadcrums from "@/components/Breadcrums";
import ProductDesc from "@/components/ProductDesc";
import ProductImg from "@/components/ProductImg";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SingleProducts = () => {
  const params = useParams();
  const productId = params.id;
  const { products } = useSelector((store) => store.product);
  const product = products.find((item) => item._id === productId);

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-50/50 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gray-100/50 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="px-4 sm:px-6 md:px-8 lg:px-10 pt-28 pb-20 max-w-7xl mx-auto">
        <Breadcrums product={product} />

        <div className="mt-8 bg-white/60 backdrop-blur-2xl rounded-[3rem] p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
          <div
            className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-12 lg:gap-16
            items-start
          "
          >
            <ProductImg images={product.productImg} />
            <ProductDesc product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProducts;
