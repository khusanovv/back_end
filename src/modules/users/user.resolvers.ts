import jwt from "jsonwebtoken";
import { User } from "../../models/user/users";
export default {
  Query: {
    user: async (_: undefined, __: object, headers: acces_token_type) => {
      try {
        jwt.verify(headers.acces_token, "1313");
        return await User.find({});
      } catch (error) {
        return new Error(error.message);
      }
    },
  },
  Mutation: {
    signin: async (_: undefined, data: SingupData) => {
      try {
        const user = await User.findOne({ email: data.email });

        const validUser = await User.findOne({ ...data });

        if (!validUser) {
          return new Error("User is not authenticated");
        }

        const token = jwt.sign({ _id: user._id }, "1313");

        return {
          succes: true,
          data: user,
          acces_token: token,
        };
      } catch (error) {
        return {
          succes: false,
          data: null,
          acces_token: null,
        };
      }
    },
    signup: async (_: undefined, data: SingupData) => {
      try {
        const user = await User.findOne({ email: data.email });
        if (user) {
          return new Error("User already exists");
        }
        const newUser = await User.create({ ...data });
        const token = jwt.sign({ _id: newUser._id }, "1313");
        console.log(newUser);

        return {
          succes: true,
          data: newUser,
          acces_token: token,
        };
      } catch (error) {
        return {
          succes: true,
          data: null,
          msg: error.message,
        };
      }
    },
    deleteUsers: async (
      _: undefined,
      params: Params_id,
      headers: acces_token_type
    ) => {
      try {
        const user = await User.findOne({ _id: params.id });
        jwt.verify(headers.acces_token, "1313");
        if (!user) {
          return new Error("User already deleted");
        }
        await User.findByIdAndDelete({ _id: params.id });
        return {
          succes: true,
          msg: "deleted user",
        };
      } catch (error) {
        return { succes: false, msg: error.message };
      }
    },
    editUsers: async (_: undefined, { data }, headers: acces_token_type) => {
      try {
        let existed = await User.findById({ _id: data.id });
        jwt.verify(headers.acces_token, "1313");
        if (!existed) {
          throw new Error("User not found!");
        }

        const Users = await User.findOneAndUpdate(
          { _id: data.id },
          { ...existed, ...data },
          { new: true }
        );
        return { succes: true, msg: "updated", data: Users };
      } catch (error) {
        return { succes: false, msg: error.message, data: null };
      }
    },
  },
};
