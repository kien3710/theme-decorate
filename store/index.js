import { init } from "@rematch/core";
import * as models from "./models";

const store = init({
  models: models,
});
export default store;
