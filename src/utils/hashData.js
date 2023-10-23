import bcrypt from "bcrypt";
export async function hashData(data) {
  try {
    const hashedPassword = await bcrypt.hash(data, 10);
    return hashedPassword;
  } catch (error) {
    return { message: "Error en hashar la contraseña", err };
  }
}
export async function compareData(data, dataDB) {
  try {
    const comparedPassword = await bcrypt.compare(data, dataDB);
    return comparedPassword;
  } catch (error) {
    return { status: false, error };
  }
}
