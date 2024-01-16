import test from "supertest";
import app from "../app.js";
import httpCode from "http-status-codes";
import Database from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const env = dotenv.config().parsed;

let server;
let db;

beforeAll((done) => {
  server = app.listen(0, done);
  db = Database.getInstance();
});

afterAll((done) => {
  server.close(done);
  db.closePool();
});

describe("로그인 페이지 테스트", () => {
  it("GET /log-in 에서 logIn.html 을 전송", (done) => {
    test(app)
      .get("/log-in")
      .expect("Content-Type", /html/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.text).toContain("<title>로그인</title>"))
      .end(done);
  });
});

describe("로그인 시도 테스트", () => {
  it("POST /log-in 에서 아이디가 올바르지 않은 경우 사용자에게 재시도 요청", (done) => {
    test(app)
      .post("/log-in")
      .send({ id: "asdf", password: "login" })
      .expect("Content-Type", /json/)
      .expect(httpCode.UNAUTHORIZED)
      .expect((res) => expect(res.body).toEqual("입력한 ID 는 존재하지 않습니다."))
      .end(done);
  });

  it("POST /log-in 에서 비밀번호가 올바르지 않은 경우 사용자에게 재시도 요청", (done) => {
    test(app)
      .post("/log-in")
      .send({ id: "login", password: "asdf" })
      .expect("Content-Type", /json/)
      .expect(httpCode.UNAUTHORIZED)
      .expect((res) => expect(res.body).toEqual("틀린 비밀번호입니다."))
      .end(done);
  });

  it("POST /log-in 에서 로그인 성공 사용자에게 JWT 를 쿠키로 발급", (done) => {
    test(app)
      .post("/log-in")
      .send({ id: "login", password: "login" })
      .expect("Content-Type", /json/)
      .expect(httpCode.OK)
      .expect((res) => {
        expect(res.headers["set-cookie"]).toBeDefined();
        const token = res.headers["set-cookie"][0].split("=")[1].split(";")[0];
        const decoded = jwt.verify(token, env.SECRET_KEY);
        expect(decoded.id).toEqual("login");
        expect(res.body).toEqual("로그인 성공");
      })
      .end(done);
  });
});
