import test from "supertest";
import app from "../app.js";
import httpCode from "http-status-codes";
import Database from "../db.js";

import { issueTokenforTest } from "../src/middleware/issueToken.middleware.js";

let server;
let db;
let token;

beforeAll(async () => {
  server = await app.listen(0);
  db = Database.getInstance();
  token = issueTokenforTest("review1");
});

afterAll((done) => {
  server.close(done);
  db.closePool();
});

describe("리뷰 가져오기 테스트", () => {
  it("/review/:isbn/:page 에서 해당 도서에 대한 사용자의 리뷰를 최신순으로 5개 전송", (done) => {
    const answer = [
      {
        user_id: "review3",
        created_at: "2024-01-20 15:46:40",
        content: "누구나 한번쯤 코드를 작성하면서 고민하게 되는 내용에 대해서 해결 방안 중 하나로서 제시되는 책이네요",
      },
      {
        user_id: "review2",
        created_at: "2024-01-20 15:45:55",
        content: "좋은 내용으로 읽을만 합니다",
      },
      {
        user_id: "review1",
        created_at: "2024-01-20 15:45:44",
        content: "가벼운 문체로 좋은 코드를 작성하는 지침을 알기 쉽게 전달해줘서 좋았습니다",
      },
    ];

    test(app)
      .get("/review/8979142994/1")
      .expect("Content-Type", /json/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.body).toEqual(answer))
      .end(done);
  });
});

describe("리뷰 작성 테스트", () => {
  it("/review/:isbn 에서 작성한 리뷰가 등록", (done) => {
    test(app)
      .post("/review/9788983925664")
      .set("Authorization", `Bearer ${token}`)
      .send({
        content:
          "수년동안 인물들이 역경을 극복하고 훌륭한 마법사로서 성장하는 판타지 서사시로 남녀노소 누구나 읽을만 한거 같습니다",
      })
      .expect("Content-Type", /json/)
      .expect(httpCode.CREATED)
      .expect((res) => expect(res.body).toEqual("리뷰 작성"))
      .end(done);
  });

  it("/review/:isbn 에서 이미 작성한 리뷰가 있다면 요청을 거부", (done) => {
    test(app)
      .post("/review/9788983925664")
      .set("Authorization", `Bearer ${token}`)
      .send({
        content:
          "수년동안 인물들이 역경을 극복하고 훌륭한 마법사로서 성장하는 판타지 서사시로 남녀노소 누구나 읽을만 한거 같습니다",
      })
      .expect("Content-Type", /json/)
      .expect(httpCode.CONFLICT)
      .expect((res) => expect(res.body).toEqual("이미 존재하는 값 또는 중복된 요청입니다."))
      .end(done);
  });
});

describe("리뷰 수정 테스트", () => {
  it("/review/:isbn 에서 이미 작성한 리뷰를 수정", (done) => {
    test(app)
      .put("/review/9788983925664")
      .set("Authorization", `Bearer ${token}`)
      .send({
        content:
          "현대 사회에서 마법사가 된다는 상상을 최초로 크게 히트시킨 작품으로 판타지를 좋아한다면 필독서인거 같아요",
      })
      .expect("Content-Type", /json/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.body).toEqual("리뷰 수정"))
      .end(done);
  });

  it("/review/:isbn 에서 수정한 리뷰가 잘 등록되었는지 확인", async () => {
    const conn = await db.getConnection();
    const answer =
      "현대 사회에서 마법사가 된다는 상상을 최초로 크게 히트시킨 작품으로 판타지를 좋아한다면 필독서인거 같아요";
    const sql = "select content from review where book_id = '9788983925664' and user_id = 'review1'";
    const content = await conn.query(sql);
    expect(content[0][0].content).toEqual(answer);
  });
});

describe("리뷰 삭제 테스트", () => {
  it("/review/:isbn 에서 해당 리뷰를 삭제", (done) => {
    test(app)
      .delete("/review/9788983925664")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(httpCode.OK)
      .expect((res) => expect(res.body).toEqual("리뷰 삭제"))
      .end(done);
  });

  it("/review/:isbn 에서 해당 리뷰가 삭제되었는지 확인", async () => {
    const conn = await db.getConnection();
    const sql = "select count(*) as count from review where book_id = '9788983925664' and user_id = 'review1'";
    const result = await conn.query(sql);
    expect(result[0][0].count).toEqual(0);
  });
});
