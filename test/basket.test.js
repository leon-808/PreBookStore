import test from "supertest";
import assert from "assert";
import app from "../app.js";
import code from "http-status-codes";
import Database from "../db.js";

import { issueTokenforTest } from "../src/middleware/issueToken.middleware.js";

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

describe("장바구니 페이지 전송 테스트", () => {
  it("GET /basket 에서 basket.html 을 전송해야함", (done) => {
    test(app)
      .get("/basket")
      .expect("Content-Type", /html/)
      .expect(code.OK)
      .end((err, res) => {
        if (err) return done(err);
        assert(res.text.includes("<title>장바구니 페이지</title>"));
        done();
      });
  });
});

describe("장바구니 목록 불러오기 테스트", () => {
  it("GET /:user_id 에서 해당 유저의 장바구니 목록을 전송해야함", (done) => {
    const answer = [
      {
        id: "8979142994",
        price: 14000,
        title: "읽기 쉬운 코드가 좋은 코드다",
        url: "2.jpg",
      },
      {
        id: "9788937437564",
        price: 15000,
        title: "참을 수 없는 존재의 가벼움",
        url: "7.jpg",
      },
    ];
    const token = issueTokenforTest("leehoosgg");

    test(app)
      .get("/basket/leehoosgg")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(code.OK)
      .end((err, res) => {
        if (err) return done(err);
        const provide = res.body;
        assert.deepStrictEqual(provide, answer);
        done();
      });
  });
});
