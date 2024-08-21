import mongoose from "mongoose";

const hs = new mongoose.Schema(
    {
        issues:{
            type: String,
            required : true,
        }
    },{timestamps:true}
);

const HealthIssue = mongoose.model("HealthIssue",hs);

export default HealthIssue;

export const getHealthIssues = () => HealthIssue.find();
export const getHealthIssueById = (id) => HealthIssue.findById(id);
export const createHealthIssue = (values) => {
    console.log('Creating health issue with values:', values);
    return new HealthIssue(values).save()
      .then((healthIssue) => healthIssue.toObject())
      .catch((error) => {
        console.error('Error creating health issue:', error);
        throw error;
    });
};
export const deleteHealthIssueById = (id) => HealthIssue.findOneAndDelete({ _id: id });
export const updateHealthIssueById = (id, values) => HealthIssue.findByIdAndUpdate(id, values);