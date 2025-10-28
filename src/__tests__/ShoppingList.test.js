import { render, screen, waitFor } from "@testing-library/react";
import ShoppingList from "../components/ShoppingList"; // ✅ Adjust if needed

// ✅ Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: 1, name: "Yogurt", category: "Dairy" },
        { id: 2, name: "Pomegranate", category: "Produce" },
      ]),
  })
);

describe("ShoppingList Component", () => {
  test("renders fetched items correctly", async () => {
    render(<ShoppingList />);

    // ✅ Wait for items to appear
    await waitFor(() => {
      expect(screen.getByText("Yogurt")).toBeInTheDocument();
      expect(screen.getByText("Pomegranate")).toBeInTheDocument();
    });
  });
});

