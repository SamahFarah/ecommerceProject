import { AppError } from "../../../AppError.js";
import productModel from "../../../DB/models/product.model.js";
import cartModel from "../../../DB/models/cart.model.js"

export const addToCart = async (req, res, next) => {
    const userId = req.id;
    let cart = await cartModel.findOne({userId});
    const productsToAdd = req.body.products;
    for (let i = 0; i < productsToAdd.length; i++) {
        const product = await productModel.findById(productsToAdd[i].productId);
        if (!product) {
            return next(new AppError(`Product with ID ${productsToAdd[i].productId} not found`, 404));
        }
    }

    if (!cart) {
        cart = await cartModel.create({
            userId,
            products: productsToAdd.map(p => ({
                productId: p.productId,
                quantity: p.quantity || 1
            }))
        });
        return res.status(201).json({ message: "successs", cart });
    }

   
    for (let i = 0; i < productsToAdd.length; i++) {
        const existingProduct = cart.products.find(p => p.productId.toString() === productsToAdd[i].productId);

        if (existingProduct) {
            return next(new AppError(`cannot add existing product  `, 404));

        } else {
            
            await cartModel.updateOne(
                { userId },
                { $push: { products: { productId: productsToAdd[i].productId, quantity: productsToAdd[i].quantity || 1 } } }
            );
        }
    }

    return res.status(200).json({ message: "success" });
};


export const removeItem = async (req, res, next) => {
    const userId = req.id;
    const { productId } = req.body;

    
    if (!productId) {
        return next(new AppError('Product ID is required', 400));
    }


    const cart = await cartModel.findOne({ userId });

   
    if (!cart) {
        return next(new AppError('Cart not found', 404));
    }


    const productExists = cart.products.some(p => p.productId.toString() === productId);

    if (!productExists) {
        return next(new AppError('Product not found in cart', 404));
    }

   
    const updatedCart = await cartModel.findOneAndUpdate(
        { userId },
        { $pull: { products: { productId } } },
        { new: true } 
    );

    return res.status(200).json({ message: "success", updatedCart });
};

export const clearCart = async (req, res, next) => {
    const userId = req.id; 
  
    const cart = await cartModel.findOne({ userId });

    if (!cart) {
        return next(new AppError('Cart not found', 404));
    }

    const updatedCart = await cartModel.findOneAndUpdate(
        { userId },
        { $set: { products: [] } }, 
        { new: true } 
    );

    return res.status(200).json({ message: "success", updatedCart });
};


export const increaseQuantity = async (req, res, next) => {
    const userId = req.id; 
    const { quantity } = req.body; 
    const { productId } = req.params; 

    
    if (quantity === undefined) {
        return next(new AppError('Quantity is required', 400));
    }

  
    if (quantity <= 0) {
        return next(new AppError('Quantity must be greater than 0', 400));
    }

    
    const cart = await cartModel.findOne({ userId });

   
    if (!cart) {
        return next(new AppError('Cart not found', 404));
    }

   
    const productInCart = cart.products.find(p => p.productId.toString() === productId);

  
    if (!productInCart) {
        return next(new AppError('Product not found in cart', 404));
    }

    
    productInCart.quantity += quantity;

    const updatedCart = await cartModel.findOneAndUpdate(
        { userId, 'products.productId': productId },
        { $set: { 'products.$.quantity': productInCart.quantity } }, 
        { new: true } 
    );

    return res.status(200).json({ message: "success", updatedCart });
};


export const decreaseQuantity = async (req, res, next) => {
    const userId = req.id;
    const { quantity } = req.body;
    const { productId } = req.params;

    if (quantity === undefined) {
        return next(new AppError('Quantity is required', 400));
    }

    if (quantity <= 0) {
        return next(new AppError('Quantity must be greater than 0', 400));
    }

    const cart = await cartModel.findOne({ userId });

    if (!cart) {
        return next(new AppError('Cart not found', 404));
    }

    const productInCart = cart.products.find(p => p.productId.toString() === productId);

    if (!productInCart) {
        return next(new AppError('Product not found in cart', 404));
    }

    if (productInCart.quantity - quantity < 0) {
        return next(new AppError('Quantity cannot be less than 0', 400));
    }

    productInCart.quantity -= quantity;

    let updateOperation;

    if (productInCart.quantity === 0) {
        updateOperation = { $pull: { products: { productId } } };
    } else {
        updateOperation = { $set: { 'products.$.quantity': productInCart.quantity } };
    }

    const updatedCart = await cartModel.findOneAndUpdate(
        { userId, 'products.productId': productId },
        updateOperation,
        { new: true }
    );

    return res.status(200).json({ message: "success", updatedCart });
};

export const getCart = async (req, res, next) => {
    const userId = req.id;

    const cart = await cartModel.findOne({ userId }).populate('products.productId');

    if (!cart) {
        return next(new AppError('Cart not found', 404));
    }

    return res.status(200).json({ message: "success", cart });
};
