import mongoose from "mongoose";
import dotenv from "dotenv";
import productModel from "./models/productModel.js";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL?.trim();

// Base image pools per category
const categoryImages = {
    "Mobile Covers": [
        "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1586953208448-b95a79279f24?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1541814674724-4cececb980b1?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1605170439002-90845e8c0137?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=600&q=80"
    ],
    "Charging Cables": [
        "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1590483864071-789a2ce0a831?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1584852924151-dfebbf223fc9?auto=format&fit=crop&w=600&q=80"
    ],
    "Smart Watches": [
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1617625802912-c0f524a1d2f2?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80"
    ],
    "Airpods": [
        "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1572569438062-cba2060dac5e?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1608156639585-b3a032845fb7?auto=format&fit=crop&w=600&q=80"
    ],
    "Chargers": [
        "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1628102491629-77858f62f831?auto=format&fit=crop&w=600&q=80"
    ],
    "Wired Headphones": [
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1585298723682-7115561c51b7?auto=format&fit=crop&w=600&q=80"
    ],
    "Wireless Headphones": [
        "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1612222869049-d8ec83637a3c?auto=format&fit=crop&w=600&q=80"
    ]
};

const categories = Object.keys(categoryImages);

// Create combinations of models to ensure uniqueness
const modelsByBrand = {
    "Apple": ["Series", "Pro", "Max", "Mini", "Air", "Plus", "Ultra", "SE"],
    "Samsung": ["Galaxy", "Plus", "Ultra", "Lite", "FE", "Pro", "Edge", "Active"],
    "Sony": ["XM3", "XM4", "XM5", "Extra Bass", "Studio", "Pro", "Elite", "Core"],
    "JBL": ["Tune", "Quantum", "Live", "Reflect", "Endurance", "Wave", "Tour", "Club"],
    "Anker": ["Soundcore", "Nano", "PowerPort", "PowerLine", "Liberty", "Life", "Space", "Flow"],
    "Spigen": ["Tough Armor", "Liquid Air", "Ultra Hybrid", "Thin Fit", "Rugged Armor", "Neo Hybrid", "Core Armor", "Optik"],
    "Boat": ["Airdopes", "Bassheads", "Rockerz", "Watch", "Storm", "Xtend", "Wave", "Lunar"],
    "OnePlus": ["Nord", "Bullets", "Buds", "Pro", "Z", "Warp", "Dash", "SuperVOOC"]
};

const brands = Object.keys(modelsByBrand);

const generateProducts = () => {
    const products = [];
    const usedNames = new Set();
    let productIndex = 1;

    for (let i = 0; i < 52; i++) {
        const category = categories[i % categories.length];
        const brand = brands[i % brands.length];
        const availableModels = modelsByBrand[brand];
        
        let productName = "";
        let modifier = 1;
        
        // Ensure strictly unique product name
        do {
            const model = availableModels[Math.floor(Math.random() * availableModels.length)];
            const version = Math.floor(Math.random() * 10) + 1;
            productName = `${brand} ${model} ${category} V${version} (Gen ${modifier})`;
            modifier++;
        } while (usedNames.has(productName));
        
        usedNames.add(productName);

        // Exactly 3 images per product
        const availableImages = categoryImages[category];
        const images = [];
        
        for (let j = 0; j < 3; j++) {
            // Pick images cyclically or randomly, appending a small query param to prevent browser caching if same url
            // Unsplash caches identically sized images, but let's use actual array elements.
            const imgUrl = availableImages[(i + j) % availableImages.length];
            // Add a slight size difference to ensure the frontend treats them as unique files if needed,
            // or just use the same high-res URL and it's fine.
            const uniqueUrl = `${imgUrl}&v=${productIndex}_${j}`;
            
            images.push({
                url: uniqueUrl,
                public_id: `real_dummy_${productIndex}_${j}`
            });
        }

        products.push({
            productName: productName,
            productDesc: `Discover the highly rated ${productName}. This premium ${category.toLowerCase()} is designed by ${brand} with advanced features for ultimate satisfaction. Get the best value and quality guaranteed.`,
            productPrice: Math.floor(Math.random() * 4500) + 299,
            category: category,
            brand: brand,
            productImg: images
        });
        
        productIndex++;
    }
    return products;
}

const seedDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to MongoDB.");
        
        // Remove ALL previous products that look like they were generated by the seed script.
        // The first version used "Experience the best with the".
        // The second version also used "Experience the best with the".
        // Let's delete all those, or just clear the collection if that's safe.
        // Assuming it's safe to clear all seeded products.
        const resultDelete = await productModel.deleteMany({ productDesc: { $regex: /best/i } });
        console.log(`Deleted ${resultDelete.deletedCount} old placeholder products.`);
        
        const products = generateProducts();
        
        // Insert new unique products
        const resultInsert = await productModel.insertMany(products);
        console.log(`${resultInsert.length} strictly unique products (each with exactly 3 images) have been successfully added to the database.`);
        
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDatabase();
