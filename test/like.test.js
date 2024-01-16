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
  token = issueTokenforTest("like");
});

afterAll((done) => {
  server.close(done);
  db.closePool();
});

describe("좋아요 활성화 테스트", () => {
  it("POST /:isbn 에서 비 로그인시 좋아요 활성화 접근 제한", (done) => {
    test(app)
      .post("/like/9788950922382")
      .expect("Content-Type", /json/)
      .expect(httpCode.UNAUTHORIZED)
      .expect((res) => expect(res.body).toEqual("권한이 없습니다. 로그인을 해주세요."))
      .end(done);
  });

  it("POST /:isbn 에서 로그인시 해당 도서에 대해 유저의 좋아요 활성화", (done) => {
    test(app)
      .post("/like/9788950922382") // 반지의 제왕
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.body).toEqual("좋아요 활성"))
      .end(done);
  });

  it("POST /:isbn 에서 로그인시 이미 좋아요한 도서에 대한 추가 좋아요 거부", (done) => {
    test(app)
      .post("/like/9788950922382")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(httpCode.CONFLICT)
      .expect((res) => expect(res.body).toEqual("이미 존재하는 값 또는 중복된 요청입니다."))
      .end(done);
  });
});

describe("좋아요 비활성화 테스트", () => {
  it("DELETE /:isbn 에서 비 로그인시 좋아요 비활성화 접근 제한", (done) => {
    test(app)
      .delete("/like/9788950922382")
      .expect("Content-Type", /json/)
      .expect(httpCode.UNAUTHORIZED)
      .expect((res) => expect(res.body).toEqual("권한이 없습니다. 로그인을 해주세요."))
      .end(done);
  });

  it("DELETE /:isbn 에서 로그인시 해당 도서에 대해 유저의 좋아요 비활성화", (done) => {
    test(app)
      .delete("/like/9788950922382") // 반지의 제왕
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.body).toEqual("좋아요 비활성"))
      .end(done);
  });
});
