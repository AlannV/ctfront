import * as mailingActions from "./mailing";
import * as miscGetters from "./miscGetters";
import * as moviesActions from "./movies";
import * as productsActions from "./products";
import * as purchasesActions from "./purchases";
import * as roomActions from "./rooms";
import * as schedulesActions from "./schedules";
import * as uploadFileActions from "./uploadImg";
import * as userActions from "./user.js";

const allActions = {
  ...mailingActions,
  ...miscGetters,
  ...moviesActions,
  ...productsActions,
  ...purchasesActions,
  ...roomActions,
  ...schedulesActions,
  ...uploadFileActions,
  ...userActions,
};

export default allActions;
