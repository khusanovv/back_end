import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";
import { jops } from "../../models/jops/jops";
import { GraphQLUpload } from "graphql-upload-ts";
import fs, { createWriteStream } from "fs";
import { resolve } from "path";
export default {
  Query: {
    all_jops: async (_: undefined, __: object, headers: acces_token_type) => {
      try {
        jwt.verify(headers.acces_token, "1313");
        return await jops.find({});
      } catch (error) {
        return new GraphQLError(error.message);
      }
    },
    find_byid: async (
      _: undefined,
      params: Params_id,
      headers: acces_token_type
    ) => {
      try {
        jwt.verify(headers.acces_token, "1313");
        let find_jop = await jops.findById({ _id: params.id });
        if (!find_jop) {
          throw new Error("Not found jop");
        }
        return find_jop;
      } catch (error) {
        return new Error(error.message);
      }
    },
  },
  Mutation: {
    addjops: async (
      _: undefined,
      { file, ...data },
      headers: acces_token_type
    ) => {
      try {
        jwt.verify(headers.acces_token, "1313");
        let rasm = "";
        for (let i = 0; i < file.length; i++) {
          let { filename, createReadStream } = await file[i];
          filename = Date.now() + filename.replace(/\s/g, "");
          rasm = filename;
          const stream = createReadStream();
          const out = createWriteStream(resolve("uploads", filename));
          stream.pipe(out);
        }

        let create_jops = await jops.create({ rasm, ...data });
        return {
          succes: true,
          data: create_jops,
          msg: "Created new jop",
        };
      } catch (error) {
        return {
          succes: false,
          data: null,
          msg: error.message,
        };
      }
    },

    delete_jops: async (_: undefined, { data }, headers: acces_token_type) => {
      const jop = await jops.findOne({ _id: data.id });
      jwt.verify(headers.acces_token, "1313");
      if (!jops) {
        return new GraphQLError("You don`t have like this jop for delete", {
          extensions: {
            code: "Bad reques",
            http: { status: 400 },
          },
        });
      }
      let delete_jops = await jops.findByIdAndDelete({ _id: data.id });
      return {
        succes: true,
        data: delete_jops,
        msg: "Jop succesfully deleted",
      };
    },
    update_jops: async (
      _: undefined,
      { file, ...data },
      headers: acces_token_type
    ) => {
      const jop = await jops.findOne({ _id: data.id });
      jwt.verify(headers.acces_token, "1313");
      if (!jops) {
        return new GraphQLError("You don`t have like this jop for update", {
          extensions: {
            code: "Bad reques",
            http: { status: 400 },
          },
        });
      }
      let rasm = "";
      fs.unlinkSync(resolve("uploads", jop.rasm));
      for (let i = 0; i < file.length; i++) {
        let { filename, createReadStream } = await file[i];
        console.log(filename);
        filename = Date.now() + filename.replace(/\s/g, "");
        rasm = filename;
        const stream = createReadStream();
        const out = createWriteStream(resolve("uploads", filename));
        stream.pipe(out);
      }
      let update_jops = await jops.findByIdAndUpdate(
        { _id: data.id },
        { ...jop, rasm, ...data },
        { new: true }
      );
      return {
        succes: true,
        data: update_jops,
        msg: "Job succesfully updated",
      };
    },
  },
  Upload: GraphQLUpload,
};
