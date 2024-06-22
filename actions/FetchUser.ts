import User from "@/models/user";
import connectMongoDB from "@/lib/mongoDB";
import { IUser } from "@/models/user";


export default async function isUser({ credentials }: { credentials: Record<"email" | "password", string> }): Promise<IUser | null> {
  try {
    await connectMongoDB();
    // Properly typed findOne call
    const user: IUser | null =  await User.findOne<IUser>({ email: credentials.email}).exec();
    console.log(user)

    if (!user) {
      return null;
    }

    // Assuming comparePassword is a method defined on the IUser document
    const isMatch = await user.comparePassword(credentials.password);

    if (!isMatch) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error; // Rethrow the error after logging
  }
};
