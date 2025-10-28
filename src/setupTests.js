import "@testing-library/jest-dom";

if (typeof global.setImmediate === "undefined") {
  global.setImmediate = (fn) => setTimeout(fn, 0);
}

beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementation((url, options = {}) => {
    if (url.includes("/items") && (!options.method || options.method === "GET")) {
      return Promise.resolve({
        ok: true,
        json: async () => [
          { id: 1, name: "Yogurt", category: "Dairy", isInCart: false },
          { id: 2, name: "Pomegranate", category: "Produce", isInCart: false },
          { id: 3, name: "Lettuce", category: "Produce", isInCart: false },
          { id: 4, name: "String Cheese", category: "Dairy", isInCart: false },
          { id: 5, name: "Swiss Cheese", category: "Dairy", isInCart: false },
          { id: 6, name: "Cookies", category: "Dessert", isInCart: false },
        ],
      });
    }

    // Mock POST for adding new item
    if (options.method === "POST") {
      return Promise.resolve({
        ok: true,
        json: async () => ({
          id: 999,
          name: "Ice Cream",
          category: "Dessert",
          isInCart: false,
        }),
      });
    }

    // Mock PATCH for updating item
    if (options.method === "PATCH") {
      return Promise.resolve({
        ok: true,
        json: async () => ({
          id: 1,
          name: "Yogurt",
          category: "Dairy",
          isInCart: true,
        }),
      });
    }

    // Mock DELETE for removing item
    if (options.method === "DELETE") {
      return Promise.resolve({ ok: true });
    }

    return Promise.reject(new Error("Unknown fetch request"));
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});
