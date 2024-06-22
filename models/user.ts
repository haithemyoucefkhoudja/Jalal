import mongoose, { CallbackError, Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define an interface for the User document
export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  verifyToken?:string;
  verifyTokenExpiration?:number;
  tokens?: Number;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    verifyTokenExpiration: {
        type:Number,
    },
    verifyToken:{
        type:String,
    },
    tokens: {
        type: Number,
        default: 0,
    },
    
},
{ timestamps: true }
);

// Hash the password before saving
userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err as CallbackError);
    }
});

// Compare hashed password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (err) {
        return false;
    }
};
// Create a Model
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
