import UserManager from "../persistencia/DAOs/user.posgresql.js";
const userManager = new UserManager();
const haveStore = (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.redirect(307, "/login");
  }
  //Comprobamos si el usuario tiene una tienda asociada a su cuenta de usuario
  const store = userManager.getUserById(user.id);
  if (!store) {
    return res.redirect(300, "/create-store");
  }
  //   Si posee store pasa
  store && next();
};

export default haveStore;
