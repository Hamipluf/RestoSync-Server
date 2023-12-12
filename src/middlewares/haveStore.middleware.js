import StoreManager from "../persistencia/DAOs/stores.postresql.js";
const storeManager = new StoreManager();
const haveStore = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.redirect(307, "/login");
  }
  //Comprobamos si el usuario tiene una tienda asociada a su cuenta de usuario
  const store = await storeManager.getStoreOfUser(user.id);

  if (store.error) {
    return res.redirect(300, "/create-store");
  }
  // Si posee store pasa
  store && store.id && next();
};

export default haveStore;
