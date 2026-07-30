// import { useState } from "react";
// import Zoom from "react-medium-image-zoom";
// import "react-medium-image-zoom/dist/styles.css";

// const ProductImg = ({ images }) => {
//   const [mainImg, setMainImg] = useState(images?.[0]?.url);
//   return (
//     <div className="flex gap-5 w-max">
//       <div className="gap-5 flex flex-col">
//         {images.map((img) => {
//           return (
//             <img
//               key={img.url}
//               src={img.url}
//               alt=""
//               onClick={() => setMainImg(img.url)}
//               className="cursor-pointer shadow-lg w-20 h-20 border"
//             />
//           );
//         })}
//       </div>
//       <Zoom>
//         <img src={mainImg} alt="" className="w-[500px] border shadow-lg" />
//       </Zoom>
//     </div>
//   );
// };

// export default ProductImg;
import { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ProductImg = ({ images }) => {
  const [mainImg, setMainImg] = useState(images?.[0]?.url);

  return (
    <div
      className="
      flex
      flex-col-reverse
      md:flex-row
      gap-6
      w-full
      lg:sticky lg:top-32
      animate-in slide-in-from-left-8 fade-in duration-700
    "
    >
      {/* thumbnails */}
      <div
        className="
        flex
        md:flex-col
        gap-4
        overflow-x-auto
        pb-2 md:pb-0 md:pr-2
        scrollbar-hide
      "
      >
        {images.map((img) => {
          const isActive = mainImg === img.url;
          return (
            <div 
              key={img.url}
              onClick={() => setMainImg(img.url)}
              className={`
                cursor-pointer rounded-2xl p-1 transition-all duration-300
                ${isActive ? 'bg-red-500 shadow-md' : 'bg-transparent hover:bg-gray-100'}
              `}
            >
              <img
                src={img.url}
                alt=""
                className="
                w-16 h-16
                sm:w-20 sm:h-20
                rounded-xl
                object-cover
                bg-white
              "
              />
            </div>
          );
        })}
      </div>

      {/* main image */}
      <div className="w-full flex-1 bg-white rounded-3xl p-4 sm:p-8 shadow-sm border border-gray-100 flex items-center justify-center min-h-[400px] lg:min-h-[500px]">
        <Zoom>
          <img
            src={mainImg}
            alt=""
            className="
            w-full
            max-h-[600px]
            object-contain
            rounded-2xl
            transition-transform duration-500 hover:scale-[1.02]
          "
          />
        </Zoom>
      </div>
    </div>
  );
};

export default ProductImg;
