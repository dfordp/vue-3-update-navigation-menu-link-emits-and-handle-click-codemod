import mongoose from "mongoose";

const spz  = new mongoose.Schema(
    {
        issues:{
            type: String,
            required : true,
        }
    },{timestamps:true}
);

const Specialization = mongoose.model("Specialization",spz);

export default Specialization;

export const getSpecializations = () => Specialization.find();
export const getSpecializationByIssue = (issue) => Specialization.findOne({ issue });
export const getSpecializationById = (id) => Specialization.findById(id);
export const createSpecialization = (values) => {
    console.log('Creating specialization with values:', values);
    return new Specialization(values).save()
      .then((specialization) => specialization.toObject())
      .catch((error) => {
        console.error('Error creating specialization:', error);
        throw error;
    });
};
export const deleteSpecializationById = (id) => Specialization.findOneAndDelete({ _id: id });
export const updateSpecializationById = (id, values) => Specialization.findByIdAndUpdate(id, values);