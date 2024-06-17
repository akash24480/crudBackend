import User from "../model/userModel.js";

// To create the data and save it in the database

export const create = async (req, res) => {
  try {
    const userData = new User(req.body);
    if (!userData) {
      return res.status(404).json({ msg: "User Data not found" });
    }
    const savedData = await userData.save();
    res.status(202).json({ savedData, msg: "User Added Successfully" });
  } catch (error) {
    res.staus(404).json(error);
  }
};

//To Get All the data

export const getAll = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData) {
      res.status(404).json({ msg: "NO Data Found" });
    }
    res.status(202).json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

//To get the Single user data by the id

export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      res.status(404).json({ msg: "User not found" });
    }
    res.status(202).json(userExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//update the user data by the id

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      res.status(404).json({ msg: "Not updated user not find" });
    }
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(202).json({ updateUser, msg: "Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// To delete the particular user

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "User does not exist" });
    }
    await User.findByIdAndDelete(id);
    res.status(202).json({ msg: "Deleted Successsfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
