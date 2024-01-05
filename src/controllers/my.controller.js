import code from "http-status-codes";
import bcrypt from "bcrypt";
import path from "path";
const __dirname = path.resolve();

import { getIdFromToken, isProperToken } from "../middleware/verifyToken.js";
import { selectUserforMyPage, selectUserPassword, updateUserInfo } from "../models/my.model.js";
import { genHashedPassword, comparePassword } from "../middleware/password.js";

export const my_page = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "/views/my.html"));
  } catch (err) {
    console.log(err);
    res.status(code.INTERNAL_SERVER_ERROR).sendFile(path.join(__dirname, "/views/500.html"));
  }
};

export const myDetails = async (req, res) => {
  try {
    const authID = getIdFromToken(req.headers.authorization.split(" ")[1]);
    if (authID) {
      const userInfo = await selectUserforMyPage(authID);
      return res.status(code.OK).json(userInfo);
    }
    res.status(code.UNAUTHORIZED);
  } catch (err) {
    console.log(err);
    res.status(code.INTERNAL_SERVER_ERROR);
  }
};

export const updateMyInfo = async (req, res) => {
  try {
    const { old_password, new_password, new_password_check, tel, email, address } = req.body;
    const authID = getIdFromToken(req.headers.authorization.split(" ")[1]);
    isProperToken(authID);

    const { existingPassword } = await selectUserPassword(authID);
    await comparePassword(existingPassword, old_password);

    isNewPasswordMatch(new_password, new_password_check);
    const hashedNewPassword = await genHashedPassword(new_password);
    await updateUserInfo(hashedNewPassword, tel, email, address, authID);
    res.status(code.OK).json("회원 정보 수정 완료");
  } catch (err) {
    console.log(err);
    if (err.code === code.UNAUTHORIZED || err.code === code.BAD_REQUEST) res.status(err.code).json(err.message);
    res.status(code.INTERNAL_SERVER_ERROR);
  }
};

const isNewPasswordMatch = (password, password_check) => {
  if (password !== password_check) {
    throw { code: code.BAD_REQUEST, message: "새 비밀번호 입력과 확인이 일치하지 않습니다. 다시 입력해주세요." };
  }
};
