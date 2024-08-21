import { deleteUserById, getUsers, getUserById } from '../mongodb/models/user.js';


export const getAllUsers = async (req, res) => {
    try {
      const users = await getUsers();
  
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

  export const getUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await getUserById(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  export const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedUser = await deleteUserById(id);
  
      return res.json(deletedUser);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }


  export const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { email} = req.body;
  
      if (!email){
        return res.sendStatus(400);
      }
  
      const user = await User.findById(id);
  
      if (!user) {
        return res.sendStatus(404);
      }
  
      if (email) {
        user.email = email;
      }
  
      await user.save();
  
      return res.status(200).json(user).end();
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };