import mongoose from "mongoose";


const doctorSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
        },
        orgID : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization'
        },
        specialization : [{
            type: String,
            requried : true,
        }],
        dateofJoining:{
            type:Date,
            required : true,
        },
        experienceYears : {
            type : Number,
            required : true,
            validate : {
                validator : Number.isInteger,
                message   : '{VALUE} is not an integer value'
            },
            min: [0, 'Experience years cannot be less than zero']
        }
    }
);


const Doctor = mongoose.model("Doctor" , doctorSchema);

export default Doctor;


export const getDoctors = () => Doctor.find();
export const getDoctorById = (id) => Doctor.findById(id);
export const createDoctor = (values) => {
    console.log('Creating doctor with values:', values);
    return new Doctor(values).save()
      .then((doctor) => doctor.toObject())
      .catch((error) => {
        console.error('Error creating doctor:', error);
        throw error;
    });
};
export const deleteDoctorById = (id) => Doctor.findOneAndDelete({ _id: id });
export const updateDoctorById = (id, values) => Doctor.findByIdAndUpdate(id, values);