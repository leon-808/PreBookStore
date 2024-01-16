import test from "supertest";
import app from "../app.js";
import httpCode from "http-status-codes";
import Database from "../db.js";

import { issueTokenforTest } from "../src/middleware/issueToken.middleware.js";

let server;
let db;
let token;

beforeAll((done) => {
  server = app.listen(0, done);
  db = Database.getInstance();
  token = issueTokenforTest("my");
});

afterAll((done) => {
  server.close(done);
  db.closePool();
});

describe("마이 페이지 전송 테스트", () => {
  it("GET /my 에서 my.html 을 전송", (done) => {
    test(app)
      .get("/my")
      .expect("Content-Type", /html/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.text).toContain("<title>마이 페이지</title>"))
      .end(done);
  });
});

describe("마이 페이지 회원 정보 전송 테스트", () => {
  it("GET /my/detail 에서 로그인한 회원의 정보 전송", (done) => {
    const answer = {
      id: "my",
      name: "My",
      birth: "2000-01-05",
      tel: "010-0000-0005",
      email: "my@gmail.com",
      address: "마이",
    };

    test(app)
      .get("/my/detail")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.body).toEqual(answer))
      .end(done);
  });
});

describe("마이 페이지 회원 정보 수정 테스트", () => {
  it("PUT /my 에서 기존 비밀번호 입력을 틀렸을 때 진행 중지", (done) => {
    test(app)
      .put("/my")
      .set("Authorization", `Bearer ${token}`)
      .send({
        old_password: "mine",
        new_password: "my1",
        new_password_check: "my1",
        tel: "010-9999-0005",
        email: "my1@gmail.com",
        address: "마이원",
      })
      .expect("Content-Type", /json/)
      .expect(httpCode.UNAUTHORIZED)
      .expect((res) => expect(res.body).toEqual("비밀번호를 잘못 입력하셨습니다."))
      .end(done);
  });

  it("PUT /my 에서 신규 비밀번호 입력이 서로 일치하지 않을 때 진행 중지", (done) => {
    test(app)
      .put("/my")
      .set("Authorization", `Bearer ${token}`)
      .send({
        old_password: "my",
        new_password: "my1",
        new_password_check: "my2",
        tel: "010-9999-0005",
        email: "my1@gmail.com",
        address: "마이원",
      })
      .expect("Content-Type", /json/)
      .expect(httpCode.UNAUTHORIZED)
      .expect((res) => expect(res.body).toEqual("새 비밀번호 입력과 확인이 일치하지 않습니다. 다시 입력해주세요."))
      .end(done);
  });

  it("PUT /my 에서 신규 회원 정보로 업데이트 진행", (done) => {
    test(app)
      .put("/my")
      .set("Authorization", `Bearer ${token}`)
      .send({
        old_password: "my",
        new_password: "my1",
        new_password_check: "my1",
        tel: "010-9999-0005",
        email: "my1@gmail.com",
        address: "마이원",
      })
      .expect("Content-Type", /json/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.body).toEqual("회원 정보 수정 완료"))
      .end(done);
  });

  it("업데이트한 회원 정보를 확인하고 직전 테스트 롤백", async () => {
    const conn = await db.getConnection();
    const result = await conn.query("select id, name, tel, email, address from user where id = 'leehoosgg'");
    const answer = {
      id: "my",
      tel: "010-9999-0005",
      email: "my1@gmail.com",
      address: "마이원",
    };
    expect((result) => expect(result).toEqual(answer));

    const res = await test(app)
      .put("/my")
      .set("Authorization", `Bearer ${token}`)
      .send({
        old_password: "my1",
        new_password: "my",
        new_password_check: "my",
        tel: "010-0000-0005",
        email: "my@gmail.com",
        address: "마이",
      })
      .expect("Content-Type", /json/)
      .expect(httpCode.OK);

    expect((res) => expect(res.body).toEqual("회원 정보 수정 완료"));
  });
});
