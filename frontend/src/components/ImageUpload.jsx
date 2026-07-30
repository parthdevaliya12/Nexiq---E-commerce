import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";
import { X } from "lucide-react";

const ImageUpload = ({ productData, setProductData }) => {
  const handleFile = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length) {
      setProductData((prev) => ({
        ...prev,
        productImg: [...prev.productImg, ...files],
      }));
    }
  };

  const removeImg = (index) => {
    setProductData((prev) => {
      const updatedImg = prev.productImg.filter((_, i) => i !== index);

      return {
        ...prev,
        productImg: updatedImg,
      };
    });
  };

  return (
    <div className="grid gap-2">
      <Label>Product Image</Label>

      <Input
        type="file"
        className="hidden"
        accept="image/*"
        id="file-upload"
        onChange={handleFile}
        multiple
      />

      <Button variant="outline">
        <label htmlFor="file-upload" className="cursor-pointer">
          Upload Images
        </label>
      </Button>

      {productData.productImg.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mt-3 sm:grid-cols-3">
          {productData.productImg.map((file, index) => {
            let preview;

            if (file instanceof File) {
              preview = URL.createObjectURL(file);
            } else if (typeof file === "string") {
              preview = file;
            } else if (file?.url) {
              preview = file.url;
            } else {
              return null;
            }

            return (
              <Card key={index} className="relative group overflow-hidden">
                <CardContent>
                  <img
                    src={preview}
                    alt=""
                    className="w-full h-32 object-cover rounded-md"
                  />

                  <button
                    onClick={() => removeImg(index)}
                    className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <X size={14} />
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
