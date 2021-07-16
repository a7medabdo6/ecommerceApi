const slugify = require("slugify");
const Category = require("../models/category");

function createCategories(categories, parentId = null) {
  var categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      parentId: cate.parentId,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}

exports.CategoryController = async (req, res) => {
  const categoryObj = {
    name: req.body.name,
  };

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }
  try {
    const cat = new Category(categoryObj);
    await cat.save();
    res.status(201).json(cat);
  } catch (err) {
    console.log(err, "err");
    res.status(400).send(err);
  }
};
exports.getCategoris = async (req, res) => {
  try {
    const cat = await Category.find({});

    const categoryList = createCategories(cat);
    res.status(200).json({ categoryList });
  } catch (err) {
    console.log(err);
    res.status(400).send("no catgories");
  }
};
