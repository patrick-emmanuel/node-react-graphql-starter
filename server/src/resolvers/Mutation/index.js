import auth from "./auth";
import role from "./role";

const Mutation = {
  ...auth,
  ...role
};

export default Mutation;
