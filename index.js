// ==========================================
// 1. HIGHER-ORDER FUNCTIONS (map, filter, reduce, find, some, every)
// ==========================================
console.log("=== 1. HIGHER-ORDER FUNCTIONS DEMO ===");

const products = [
  { id: 1, name: "Laptop", price: 1200, category: "electronics", inStock: true },
  { id: 2, name: "Headphones", price: 150, category: "electronics", inStock: true },
  { id: 3, name: "Mouse", price: 25, category: "electronics", inStock: false },
  { id: 4, name: "Desk Chair", price: 200, category: "furniture", inStock: true }
];

// filter: Filter available electronics in stock
const availableElectronics = products.filter(
  item => item.category === "electronics" && item.inStock
);
console.log("Available Electronics:", availableElectronics);

// map: Extract product names and apply 10% discount
const discountedProducts = products.map(item => ({
  name: item.name,
  discountPrice: item.price * 0.9
}));
console.log("Discounted Products (10% off):", discountedProducts);

// reduce: Calculate total value of items in stock
const totalValue = products
  .filter(item => item.inStock)
  .reduce((total, item) => total + item.price, 0);
console.log("Total Stock Value: $" + totalValue);

// Utility Iterators: find, some, every
const foundLaptop = products.find(p => p.name === "Laptop");
const hasExpensiveItem = products.some(p => p.price > 1000);
const allInStock = products.every(p => p.inStock);

console.log("Found Laptop:", foundLaptop);
console.log("Has Item > $1000?:", hasExpensiveItem);
console.log("Are All Items In Stock?:", allInStock);


// ==========================================
// 2. ASYNCHRONOUS JAVASCRIPT & EVENT LOOP
// ==========================================
console.log("\n=== 2. ASYNC & EVENT LOOP DEMO ===");

function simulateDatabaseQuery(itemId) {
  return new Promise((resolve, reject) => {
    console.log(`[Task Queue] Fetching DB record for ID: ${itemId}...`);
    setTimeout(() => {
      const item = products.find(p => p.id === itemId);
      if (item) {
        resolve(item);
      } else {
        reject(new Error(`Item with ID ${itemId} not found.`));
      }
    }, 1500); // 1.5 seconds asynchronous delay
  });
}


// ==========================================
// 3. FETCH API & JSON HANDLING
// ==========================================
console.log("\n=== 3. FETCH API & JSON PARSING DEMO ===");

async function fetchPublicPosts() {
  try {
    console.log("[Fetch] Initiating API Request...");
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3");
    
    if (!response.ok) {
      throw new Error(`HTTP Error Status: ${response.status}`);
    }

    // JSON Parsing & Processing
    const posts = await response.json();
    console.log("\n--- Received API Data (Top 3 Posts) ---");
    
    // Higher-Order Function (forEach)
    posts.forEach(post => {
      console.log(`ID: ${post.id} | Title: ${post.title.substring(0, 30)}...`);
    });

  } catch (error) {
    console.error("[Error Handling]:", error.message);
  }
}

// Main Execution Flow
async function mainRunner() {
  try {
    // Await Database Query Simulation
    const dbResult = await simulateDatabaseQuery(1);
    console.log("[DB Result Received]:", dbResult.name, `- Price: $${dbResult.price}`);

    // Await Fetch API Execution
    await fetchPublicPosts();

  } catch (err) {
    console.error("Execution Error:", err);
  }
}

// Start Execution
mainRunner();