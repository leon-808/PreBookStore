import code from "http-status-codes";
import bcrypt from "bcrypt";
import path from "path";
const __dirname = path.resolve();
import Database from "../../db.js";
const db = Database.getInstance();

import { errDB } from "../middleware/repositoryErrorHandler.middleware.js";
import { getIdFromToken, isProperToken } from "../middleware/verifyToken.middleware.js";
import { selectUserforMyPage, selectUserPassword, updateUserInfo } from "../repositories/my.repositories.js";
import { genHashedPassword } from "../middleware/password.middleware.js";

export const my_page = (req, res) => {
  res.sendFile(path.join(__dirname, "/views/my.html"));
};

export const myDetails = async (req, res) => {
  const user_id = getIdFromToken(req);
  if (user_id) {
    const userInfo = await errDB(selectUserforMyPage)(db, user_id);
    return res.status(code.OK).json(userInfo);
  }
  res.status(code.UNAUTHORIZED);
};

// TO-DO 코드 분량 리팩터링 생각해보기
export const updateMyInfo = async (req, res) => {
  const { old_password, new_password, new_password_check, tel, email, address } = req.body;
  const user_id = getIdFromToken(req);
  if (!isProperToken(user_id, res, code)) return;

  const { db_password } = await errDB(selectUserPassword)(db, user_id);
  const isPasswordMatch = await bcrypt.compare(old_password, db_password);
  if (!isPasswordMatch) {
    return res.status(code.BAD_REQUEST).json("비밀번호를 잘못 입력하셨습니다.");
  }

  isNewPasswordMatch(new_password, new_password_check);
  const hashedNewPassword = await genHashedPassword(new_password);
  await errDB(updateUserInfo)(db, hashedNewPassword, tel, email, address, user_id);
  res.status(code.OK).json("회원 정보 수정 완료");
};

const isNewPasswordMatch = (password, password_check) => {
  if (password !== password_check) {
    throw { code: code.BAD_REQUEST, message: "새 비밀번호 입력과 확인이 일치하지 않습니다. 다시 입력해주세요." };
  }
};
