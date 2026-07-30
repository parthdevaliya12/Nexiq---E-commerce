import { serverURL } from "@/serverURL";
export const serverURL = import.meta.env.MODE === "development" ? `${serverURL}` : "https://nexiq-e-commerce.onrender.com";
