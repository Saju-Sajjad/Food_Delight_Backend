import MenuItem from "../models/menuItem.js";

// Create a new menu item
export const createMenuItem = async (req, res) => {
  const { name, price } = req.body;
  const image = req.file.path; // Assuming multer middleware is used for file uploads
  const userId = req.user.id; // Assuming req.user contains the authenticated user's details

  try {
    const newMenuItem = new MenuItem({
      name,
      price,
      image,
      createdBy: userId
    });

    console.log("Created menu item:", newMenuItem); // Log newMenuItem for verification
    await newMenuItem.save(); // Save newMenuItem to the database

    res.status(201).json(newMenuItem);
  } catch (error) {
    console.error("Error creating menu item:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all menu items created by the logged-in user
export const getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ createdBy: req.user.id });
    res.json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ message: "Failed to fetch menu items" });
  }
};

// Delete a menu item by ID (only if created by the logged-in user)
export const deleteMenuItem = async (req, res) => {
  const { id } = req.params;

  try {
    const menuItem = await MenuItem.findById(id);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Check if the logged-in user is the creator of the menu item
    if (menuItem.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to delete this menu item" });
    }

    await menuItem.remove();

    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ message: "Failed to delete menu item" });
  }
};

// Add menu item to user's cart (assuming cart management within MenuItem model)
export const addToCart = async (req, res) => {
  const { id } = req.params; // Assuming id is the menu item ID
  const { quantity } = req.body;
  const userId = req.user.id; // Assuming req.user contains the authenticated user's details

  try {
    const menuItem = await MenuItem.findById(id);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Add to cart logic within the MenuItem model
    menuItem.addToCart(userId, quantity);

    // Save the updated menuItem with the cart details
    await menuItem.save();

    res.status(200).json(menuItem); // Return updated menuItem or cart details
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Failed to add item to cart" });
  }
};

// Remove menu item from user's cart (assuming cart management within MenuItem model)
export const removeFromCart = async (req, res) => {
  const { id } = req.params; // Assuming id is the menu item ID
  const userId = req.user.id; // Assuming req.user contains the authenticated user's details

  try {
    const menuItem = await MenuItem.findById(id);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Remove from cart logic within the MenuItem model
    menuItem.removeFromCart(userId);

    // Save the updated menuItem with the cart details
    await menuItem.save();

    res.status(200).json(menuItem); // Return updated menuItem or cart details
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Failed to remove item from cart" });
  }
};
