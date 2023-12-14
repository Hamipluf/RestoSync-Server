import StoreManager from "../persistencia/DAOs/stores.postresql.js";
import customResponses from "../utils/customResponses.js";
const storeManager = new StoreManager();
const haveStore = async (req, res, next) => {
  const userAuth = req.user;
  if (!userAuth) {
    return res.send(customResponses.badResponse(308, "No existe el usuario."));
  }
  //Comprobamos si el usuario tiene una tienda asociada a su cuenta de usuario
  const store = await storeManager.getStoreOfUser(userAuth.user.id);

  if (store.error) {
    return res.send(
      customResponses.badResponse(307, "No posee tiendas asociadas.", {
        token: userAuth.token,
      })
    );
  }
  // Si posee store pasa
  store && store.id && next();
};

export default haveStore;
