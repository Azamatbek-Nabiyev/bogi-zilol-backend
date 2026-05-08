const Food = require("../models/food/food");

// get all foods
const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json({
      total: foods.length,
      data: foods
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get one food
const getOneFood = async (req, res) => {
  try {
    const id = req.params.id;

    const food = await Food.findById(id);

    res.status(200).json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// create food
const createFood = async (req, res) => {
  try {
    const { category_id, name, description, price, image, is_available } =
      req.body;

    const food = await Food.create({
      category_id,
      name,
      description,
      price,
      image,
      is_available,
    });

    res.status(201).json(food);
  } catch (err) {
    res.status(500).json({ message: req.message });
  }
};

// update food
const updateFood = async (req, res) => {
  const id = req.params.id;

  try {
    const updated = await Food.findByIdAndUpdate(
      id,
      { $set: req.body },
      { returnDocument: 'after', runValidators: true },
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { getAllFoods, getOneFood, createFood , updateFood};
