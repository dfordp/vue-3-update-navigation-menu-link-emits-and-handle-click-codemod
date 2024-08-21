import mongoose from "mongoose";

const record = new mongoose.Schema(
    {
        userid : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        doctorid : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor'
        },
        orgid : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization'
        },
        issueid : [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'HealthIssue'
        }],
        diagnosis : {
            type : String,
            required : true,
        },
        MedicineCurePath: {
            type: String,
            required: true,
        },
        Attachements : {
            type : String,
            validate: {
                validator: function(v) {
                  return /^https?:\/\/.+/i.test(v);
                },
                message: props => `${props.value} is not a valid URL`
              },
            required : true,
        }
    }
);

const Record = mongoose.model("Record" , record);

export default Record;


export const getRecords = () => Record.find();
export const getRecordById = (id) => Record.findById(id);
export const createRecord = (values) => {
    console.log('Creating record with values:', values);
    return new Record(values).save()
      .then((record) => record.toObject())
      .catch((error) => {
        console.error('Error creating record:', error);
        throw error;
    });
};
export const deleteRecordById = (id) => Record.findOneAndDelete({ _id: id });
export const updateRecordById = (id, values) => Record.findByIdAndUpdate(id, values);