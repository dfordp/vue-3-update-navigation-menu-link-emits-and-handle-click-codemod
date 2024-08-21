import mongoose from "mongoose";

const appointment = new mongoose.Schema(
    {
        doctorid : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor'
        },
        userid : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        orgid : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization'
        },
        recordid : [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Record'
        }],
        issueid : [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'HealthIssue'
        }],
        additionalComments : {
            type : String,
            requrired : false,
        },
        dateofCheckup : {
            type: Date,
            required: true,
        }
    }
);


const Appointment = mongoose.model("Appointment" , appointment);

export default Appointment;

export const getAppointments = () => Appointment.find();
export const getAppointmentById = (id) => Appointment.findById(id);
export const createAppointment = (values) => {
    console.log('Creating appointment with values:', values);
    return new Appointment(values).save()
      .then((appointment) => appointment.toObject())
      .catch((error) => {
        console.error('Error creating appointment:', error);
        throw error;
    });
};
export const deleteAppointmentById = (id) => Appointment.findOneAndDelete({ _id: id });
export const updateAppointmentById = (id, values) => Appointment.findByIdAndUpdate(id, values);