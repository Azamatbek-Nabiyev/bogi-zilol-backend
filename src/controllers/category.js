const FoodCategory = require("../models/food/category");

// get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await FoodCategory.find({});

    res.status(200).json({
      total: categories.length,
      data: categories
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// create category
const createCategory = async (req, res) => {
  try {
    const { name, image, is_active } = req.body;

    const category = await FoodCategory.create({ name, image, is_active });

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get one category
const getOneCategory = async (req, res) => {
  const id = req.params.id;

  try {
    const category = await FoodCategory.findById(id);

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// update category
const updateCategory = async (req, res) => {
  const id = req.params.id;
  const { name, is_active } = req.body;

  try {
    const updated = await FoodCategory.findByIdAndUpdate(
      id,
      { name, is_active },
      { new: true },
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// delete category
const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

  const deleted = await FoodCategory.findByIdAndDelete(id);

  if(!deleted){
    return res.status(404).json({
      message: err.message,
    });
  }

  res.status(200).json({
    message: "Deleted!",
    data: deleted
  });

  } catch(err){
     res.status(500).json({
      message: err.message,
    });
  }
}

module.exports = { getAllCategories, createCategory, getOneCategory , updateCategory, deleteCategory};
