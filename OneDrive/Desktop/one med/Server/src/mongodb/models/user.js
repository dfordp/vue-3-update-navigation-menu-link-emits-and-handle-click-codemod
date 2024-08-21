import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required:[true,"Please enter user name"],
        },

        email: {
            type: String,
            required:[true,"Please Enter your Email"],
            validate:[validator.isEmail,"Please enter a valid Email"],
        },
        avatar:{
            type: String,
            validate: {
                validator: function(v) {
                  return /^https?:\/\/.+/i.test(v);
                },
                message: props => `${props.value} is not a valid URL`
              },
            required : true,
        },
        password: {
            type: String,
            required:[true,"Please enter your Password"],
        },
        dateofBirth:{
            type:Date,
            required : true,
        },
        Gender : {
            type : String,
            required : true,
        },
        DependentUsers : [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        GuardianId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        healthIssues : [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'HeathIssues'
        }]
    }, { timestamps: true }
);

const User = mongoose.model("User" , userSchema);


export default User;


export const getUsers = () => User.find();
export const getUserByEmail = (email) => User.findOne({ email });
export const getUserById = (id) => User.findById(id);
export const createUser = (values) => {
    console.log('Creating user with values:', values);
    return new User(values).save()
      .then((user) => user.toObject())
      .catch((error) => {
        console.error('Error creating user:', error);
        throw error;
    });
};
export const deleteUserById = (id) => User.findOneAndDelete({ _id: id });
export const updateUserById = (id, values) => User.findByIdAndUpdate(id, values);