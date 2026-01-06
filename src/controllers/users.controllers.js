import {
    addProductToCart,
    createNewUser,
    deleteUser as deleteUserService,
    getUserByEmail,
    getUserById,
    getAllUsers, // ✅ missing import added
    updateUser as updateUserService,
  } from "../services/users.services.js";
  
  
  export const getUsers = async (req, res) => {
    try {
      const users = await getAllUsers();   // should return an array
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  
  export const getUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await getUserById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  export const getUserByEmailAddress = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user by email:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  export const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, phoneNumber } = req.body;
      const updatedUser = await updateUserService(id, name, email, phoneNumber);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  export const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      await deleteUserService(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  export const addToCart = async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user._id; // make sure auth middleware sets req.user
      const user = await addProductToCart(userId, productId, quantity);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  