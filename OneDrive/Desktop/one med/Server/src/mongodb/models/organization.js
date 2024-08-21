import mongoose from "mongoose";
import validator from "validator";

const orgSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required:[true,"Please enter user name"],
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
        adminEmail: {
            type: String,
            required:[true,"Please Enter your Email"],
            validate:[validator.isEmail,"Please enter a valid Email"],
        },

        password: {
            type: String,
            required:[true,"Please enter your Password"],
        },
        register_id: {
            type: String,
            required:[true,"Please enter your Organization Id"],
        },
        location: {
            type: String,
            required : true,
        },
        DateofCreation:{
            type: Date,
            required: true,
        },
        ClosedDays:[{
            type: String,
            enum: ['Monday', 'Tuesday','Wednesday','Thrusday','Friday','Saturday','Sunday'],
            required: true,
        }],
        WorkingHours:[ {
            day: {
                type: String,
                enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                required: true
            },
            start: { type: String, required: true },
            end: { type: String, required: true },
        }],
    } , {timestamps : true}
);

const Organization = mongoose.model("Organization" , orgSchema);

export default Organization;


export const getOrganizations = () => Organization.find();
export const getOrganizationByAdminEmail = (email) => Organization.findOne({ adminEmail: email });
export const getOrganizationById = (id) => Organization.findById(id);
export const createOrganization = (values) => {
    console.log('Creating organization with values:', values);
    return new Organization(values).save()
      .then((organization) => organization.toObject())
      .catch((error) => {
        console.error('Error creating organization:', error);
        throw error;
    });
};
export const deleteOrganizationById = (id) => Organization.findOneAndDelete({ _id: id });
export const updateOrganizationById = (id, values) => Organization.findByIdAndUpdate(id, values);