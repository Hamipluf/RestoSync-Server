import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
// Service
import commentsService from "../../src/services/comments.service.js";

chai.use(chaiHttp);

const expect = chai.expect;

describe("Comments services", () => {
  const newCommentData = {
    comment: "Contenido del Comentario",
  };
  let commentIdcreated;

  it("Create comment for a user", async () => {
    const result = await commentsService.createComment(2, newCommentData); // User 2 es Ramiro
    commentIdcreated = result.id;
    expect(result).to.be.an("object");
    expect(result).to.have.property("id");
    expect(result).to.have.property("body").that.is.equal(newCommentData.body);
  });
  it("Ge all comments of a user", async () => {
    const userIdToFind = 2; // Ramiro
    const result = await commentsService.getAllCommentsByUserId(userIdToFind);
    expect(result).to.be.an("array");
    result.forEach((comment) => {
      expect(comment).to.be.an("object");
      expect(comment).to.have.property("id").that.is.a("number");
      expect(comment).to.have.property("body").that.is.a("string");
      expect(comment).to.have.property("user_id").that.is.a("number");
      expect(comment).to.have.property("created_at").that.is.a("date");
      expect(comment).to.have.property("updated_at").that.is.null
    });
  });
  it("Get comment by id", async () => {
    const result = await commentsService.getCommentById(commentIdcreated);
    expect(result).to.be.an("object");
    expect(result).to.have.property("id").that.is.equal(commentIdcreated);
  });
  it("Update comment", async () => {
    const updatedData = {
      body: "Body actualizado",
      updated_at: new Date(),
    };
    const result = await commentsService.updateComment(
      commentIdcreated,
      updatedData
    );
    expect(result).to.be.an("object");
    expect(result).to.have.property("id").that.is.equal(commentIdcreated);
    expect(result).to.have.property("body").that.is.equal(updatedData.body);
  });
  it("Get owner of a comment", async () => {
    const result = await commentsService.getCommentUser(commentIdcreated);
    expect(result).to.be.an("object");
    expect(result).to.have.property("id").that.is.a("number");
    expect(result).to.have.property("name").that.is.a("string");
    expect(result).to.have.property("last_name").that.is.a("string");
    expect(result).to.have.property("email").that.is.a("string");
    expect(result).to.have.property("role").that.is.a("number");
    expect(result).to.have.property("username").that.is.a("string");
    expect(result).to.have.property("photos").that.is.null;
  });
  it("Delete comment by id", async () => {
    const result = await commentsService.deleteComment(commentIdcreated);
    expect(result).to.be.an("object");
    expect(result).to.have.property("id").that.is.equal(commentIdcreated);
  });
});
