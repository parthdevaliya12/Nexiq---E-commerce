import { Button } from "./ui/button";
import { Input } from "./ui/input";

const FilterSidebar = ({
  allProducts,
  priceRange,
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  setPriceRange,
}) => {
  const Categories = allProducts.map((p) => p.category);
  const UniqueCategory = ["All", ...new Set(Categories)];

  const Brands = allProducts.map((p) => p.brand);
  const UniqueBrands = ["All", ...new Set(Brands)];

  const handleCategory = (val) => {
    setCategory(val);
  };

  const handleBrand = (e) => {
    setBrand(e.target.value);
  };

  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    if (value <= priceRange[1]) setPriceRange([value, priceRange[1]]);
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    if (value >= priceRange[0]) setPriceRange([priceRange[0], value]);
  };

  const resetFilter = () => {
    setBrand("All");
    setSearch("");
    setCategory("All");
    setPriceRange([0, 999999]);
  };

  return (
    <div
      className="
      bg-white/70 backdrop-blur-2xl
      mt-6 md:mt-10
      p-7
      rounded-[2rem]
      h-max
      hidden md:block
      w-full md:w-80
      shadow-[0_8px_30px_rgb(0,0,0,0.04)]
      border border-white
      md:sticky md:top-28
      animate-in slide-in-from-left-8 fade-in duration-1000 ease-out
      relative overflow-hidden
    "
    >
      {/* Decorative Blur Background inside Sidebar */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-100/50 rounded-full blur-3xl -z-10"></div>
      
      {/* search */}
      <div className="relative mb-8">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
          bg-white/80 backdrop-blur-sm
          p-4 rounded-2xl
          border border-gray-100
          w-full shadow-sm
          focus:ring-2 focus:ring-red-500/50 focus:border-red-500
          transition-all duration-300
        "
          placeholder="Search products..."
        />
      </div>

      {/* category */}
      <div className="mb-8">
        <h1 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
          Category
        </h1>

        <div className="flex flex-col gap-3">
          {UniqueCategory.map((item, index) => (
            <label
              key={index}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/80 cursor-pointer transition-colors group"
            >
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  checked={category === item}
                  onChange={() => handleCategory(item)}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-red-500 transition-colors"></div>
                <div className="absolute w-2.5 h-2.5 rounded-full bg-red-500 scale-0 peer-checked:scale-100 transition-transform duration-300 ease-out"></div>
              </div>
              <span className={`text-sm font-medium transition-colors ${category === item ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'}`}>
                {item}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* brand */}
      <div className="mb-8">
        <h1 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
          Brand
        </h1>

        <select
          className="
          bg-white/80 backdrop-blur-sm w-full p-4
          border border-gray-100 shadow-sm
          rounded-2xl outline-none
          focus:ring-2 focus:ring-red-500/50 focus:border-red-500
          transition-all duration-300 text-sm font-medium text-gray-700
          cursor-pointer
        "
          value={brand}
          onChange={handleBrand}
        >
          {UniqueBrands.map((item, index) => {
            return (
              <option value={item} key={index}>
                {item.toUpperCase()}
              </option>
            );
          })}
        </select>
      </div>

      {/* price range */}
      <div className="mb-8">
        <h1 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
          Price Range
        </h1>

        <div className="flex flex-col gap-4">
          <div className="flex gap-3 items-center justify-between">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
              <input
                type="number"
                min="0"
                value={priceRange[0]}
                onChange={handleMinChange}
                max="5000"
                className="w-full pl-7 pr-3 py-2.5 bg-white/80 border border-gray-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-red-500/50 outline-none shadow-sm transition-all"
              />
            </div>

            <span className="text-gray-400 font-medium">-</span>

            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
              <input
                type="number"
                min="0"
                max="999999"
                value={priceRange[1]}
                onChange={handleMaxChange}
                className="w-full pl-7 pr-3 py-2.5 bg-white/80 border border-gray-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-red-500/50 outline-none shadow-sm transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2 px-1">
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={priceRange[0]}
              onChange={handleMinChange}
              className="w-full accent-red-500 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />

            <input
              type="range"
              min="0"
              max="999999"
              step="100"
              value={priceRange[1]}
              onChange={handleMaxChange}
              className="w-full accent-red-500 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* reset */}
      <Button
        onClick={resetFilter}
        className="
        w-full mt-2 h-12
        bg-red-500 hover:bg-red-600
        text-white font-semibold rounded-2xl
        shadow-[0_8px_20px_rgba(239,68,68,0.3)]
        hover:shadow-[0_8px_25px_rgba(239,68,68,0.4)]
        hover:-translate-y-0.5
        transition-all duration-300
      "
      >
        Reset Filter
      </Button>
    </div>
  );
};

export default FilterSidebar;
