// controllers/productController.js
export const fetchProducts = async () => {
    const response = await fetch("https://api.example.com/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data; // Asegúrate de que data sea un array
  };
  