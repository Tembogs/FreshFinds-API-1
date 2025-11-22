import User from "../models/user.js";

export const createNewUser = async ( name, email, password, phoneNumber, address) => {
  const newUser = new User ({
   name: name,
   email: email,
   password: password,
   phoneNumber: phoneNumber,
   address: address
  })
  await newUser.save();
  return newUser
}

// Get all users
export const getAllUsers = async () => {
  const users = await User.find(); // returns [] if no users exist
  return users;
};

// Get user by ID
export const getUserById = async (id) => {
  return await User.findById(id);
};

// Get user by Email
export const getUserByEmail = async (emailAddress) => {
  return await User.findOne({ email: emailAddress });
};

// Update user
export const updateUser = async (id, name, emailAddress, phoneNumber) => {
  return await User.findByIdAndUpdate(
    id,
    { name, email: emailAddress, phoneNumber },
    { new: true }
  );
};

// Delete user
export const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

// Add product to cart
export const addProductToCart = async (userId, productId, quantity) => {
  const user = await User.findById(userId);
  if (!user) return null;

  const productIndex = user.cart.findIndex(
    (item) => item.product.toString() === productId
  );

  if (productIndex > -1) {
    user.cart[productIndex].quantity += quantity;
  } else {
    user.cart.push({ product: productId, quantity });
  }

  await user.save();
  return user;
};
