import mongoose from "mongoose";

const messageschema  = new mongoose.Schema(
    {
        userid : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        Sentby : {
            type: String,
            enum: ['user', 'gemini'],
            required: true
        },
        content:{
            type : String,
            required : true
        }
    },{timestamps:true}
);

const Message = mongoose.model("Messages",messageschema);

export default Message;

export const getMessages = () => Message.find();
export const getMessageById = (id) => Message.findById(id);
export const createMessage = (values) => {
    console.log('Creating message with values:', values);
    return new Message(values).save()
      .then((message) => message.toObject())
      .catch((error) => {
        console.error('Error creating message:', error);
        throw error;
    });
};
export const deleteMessageById = (id) => Message.findOneAndDelete({ _id: id });
export const updateMessageById = (id, values) => Message.findByIdAndUpdate(id, values);