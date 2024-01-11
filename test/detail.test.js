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
  token = issueTokenforTest("leehoosgg");
});

afterAll((done) => {
  server.close(done);
  db.closePool();
});

describe("도서 상세 정보 페이지 전송 테스트", () => {
  it("GET /book 에서 detail.html 을 전송", (done) => {
    test(app)
      .get("/book")
      .expect("Content-Type", /html/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.text).toContain("<title>상세 페이지</title>"))
      .end(done);
  });
});

describe("도서 상세 정보 불러오기 테스트", () => {
  it("GET /:isbn 에서 비 로그인시 해당 도서의 상세 정보를 전송", (done) => {
    const answer = [
      {
        id: "8979142994",
        category_id: 0,
        url: "2.jpg",
        title: "읽기 쉬운 코드가 좋은 코드다",
        author: "박진수",
        publication_date: "2004-09-01",
        pages: 252,
        catchpharase: "더 나은 코드를 작성하는 간단하고 실전적인 테크닉",
        price: 14000,
        detail: "",
        content_table: "",
        like_count: 1,
        likes: 0,
      },
    ];

    test(app)
      .get("/book/8979142994")
      .expect("Content-Type", /json/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.body).toEqual(answer))
      .end(done);
  });

  it("GET /:isbn 에서 로그인시 해당 도서의 상세 정보와 좋아요 여부를 전송", (done) => {
    const answer = [
      {
        id: "8979142994",
        category_id: 0,
        url: "2.jpg",
        title: "읽기 쉬운 코드가 좋은 코드다",
        author: "박진수",
        publication_date: "2004-09-01",
        pages: 252,
        catchpharase: "더 나은 코드를 작성하는 간단하고 실전적인 테크닉",
        price: 14000,
        detail: "",
        content_table: "",
        like_count: 1,
        likes: 1,
      },
    ];

    test(app)
      .get("/book/8979142994")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.body).toEqual(answer))
      .end(done);
  });
});
