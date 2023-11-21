import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
// Service
import noteService from "../../src/services/notes.services.js";

chai.use(chaiHttp);

const expect = chai.expect;

describe("Notes services", () => {
  const newNoteData = {
    title: "Título de la Nota",
    description: "Descripción de la Nota",
    owner_id: 2, // 2 es id de Ramiro
  };
  const taskId = 3; // Pedido celeste distribuidora
  let noteIdCreated;
  let commentIdCreated;

  it("Create a note", async () => {
    const result = await noteService.createNote(
      newNoteData.title,
      newNoteData.description,
      newNoteData.owner_id
    );
    noteIdCreated = result.id;
    expect(result).to.be.an("object");
    expect(result).to.have.property("id");
    expect(result).to.have.property("title").that.is.equal(newNoteData.title);
    expect(result)
      .to.have.property("description")
      .that.is.equal(newNoteData.description);
    expect(result).to.have.property("is_completed").that.is.equal(false);
    expect(result)
      .to.have.property("owner_id")
      .that.is.equal(newNoteData.owner_id);
  });
  it("Add task to note", async () => {
    const result = await noteService.addTaskToNote(noteIdCreated, taskId);
    noteIdCreated = result.id;
    expect(result).to.be.an("object");
    expect(result).to.have.property("id");
    expect(result).to.have.property("title").that.be.an("string");
    expect(result).to.have.property("description").that.be.an("string");
    expect(result).to.have.property("created_at").that.be.an("date");
    expect(result).to.have.property("is_completed").that.be.an("boolean");
    expect(result).to.have.property("owner_id").that.be.an("number");
    expect(result).to.have.property("task_id").that.is.equal(taskId);
  });
  it("Create comment of a note", async () => {
    const comment = "Comentario de Testeo";
    const user_id = 2; // Ramiro
    const result = await noteService.addCommentToNote(
      noteIdCreated,
      comment,
      user_id
    );
    commentIdCreated = result.comment_id;
    expect(result).to.be.an("object");
    expect(result).to.have.property("id").that.is.a("number");
    expect(result).to.have.property("note_id").that.is.a("number");
    expect(result).to.have.property("comment_id").that.is.a("number");
  });
  it("Get notes of user", async () => {
    const user_id = 2; // Ramiro
    const result = await noteService.getAllNotesByUserId(user_id);
    expect(result).to.be.an("array");
    result.forEach((note) => {
      expect(note).to.be.an("object");
      expect(note).to.have.property("id").that.is.a("number");
      expect(note).to.have.property("title").that.is.a("string");
      expect(note).to.have.property("description").that.is.a("string");
      expect(note).to.have.property("created_at").that.is.a("date");
      expect(note).to.have.property("is_completed").that.is.a("boolean");
      expect(note).to.have.property("owner_id").that.is.equal(user_id);
    });
  });
  it("Get all notes", async () => {
    const result = await noteService.getAllNotes();
    expect(result).to.be.an("array");
    result.forEach((note) => {
      expect(note).to.be.an("object");
      expect(note).to.have.property("id").that.is.a("number");
      expect(note).to.have.property("title").that.is.a("string");
      expect(note).to.have.property("description").that.is.a("string");
      expect(note).to.have.property("created_at").that.is.a("date");
      expect(note).to.have.property("is_completed").that.is.a("boolean");
      expect(note).to.have.property("owner_id").that.is.a("number");
    });
  });
  it("Get all note by task_id", async () => {
    const result = await noteService.getAllNotesByTaskId(taskId)
    expect(result).to.be.an("array");
    result.forEach((note) => {
      expect(note).to.be.an("object");
      expect(note).to.have.property("note_id").that.is.a("number");
      expect(note).to.have.property("title").that.is.a("string");
      expect(note).to.have.property("description").that.is.a("string");
      expect(note).to.have.property("note_created_at").that.is.a("date");
      expect(note).to.have.property("task_id").that.is.a("number");
      expect(note).to.have.property("task_name").that.is.a("string");
    });
  });
  it("Get note by id", async () => {
    const result = await noteService.getNoteById(noteIdCreated);
    expect(result).to.be.an("object");
    expect(result).to.have.property("id").that.is.equal(noteIdCreated);
  });
  it("Update a note", async () => {
    const updatedData = {
      title: "Título de la Nota A",
      description: "Descripción de la Nota A",
      is_completed: true,
    };
    const result = await noteService.updateNote(noteIdCreated, updatedData);
    expect(result).to.be.an("object");
    expect(result).to.have.property("id").that.is.equal(noteIdCreated);
    expect(result).to.have.property("title").that.is.equal(updatedData.title);
    expect(result)
      .to.have.property("description")
      .that.is.equal(updatedData.description);
    expect(result)
      .to.have.property("is_completed")
      .that.is.equal(updatedData.is_completed);
  });
  it("Get all comments of note", async () => {
    const result = await noteService.getAllCommentsByNoteId(noteIdCreated);
    expect(result).to.be.an("array");
    result.forEach((note) => {
      expect(note).to.be.an("object");
      expect(note).to.have.property("id").that.is.a("number");
      expect(note).to.have.property("body").that.is.a("string");
      expect(note).to.have.property("created_at").that.is.a("date");
      expect(note).to.have.property("user_name").that.is.a("string");
      expect(note).to.have.property("user_email").that.is.a("string");
      expect(note).to.have.property("user_username").that.is.a("string");
      expect(note).to.have.property("user_last_name").that.is.a("string");
      expect(note).to.have.property("user_role").that.is.a("number");
    });
  });
  it("Get owner of a note", async () => {
    const result = await noteService.getNoteOwner(noteIdCreated);
    expect(result).to.be.an("object");
    expect(result).to.have.property("id").that.is.a("number");
    expect(result).to.have.property("name").that.is.a("string");
    expect(result).to.have.property("last_name").that.is.a("string");
    expect(result).to.have.property("email").that.is.a("string");
    expect(result).to.have.property("role").that.is.a("number");
    expect(result).to.have.property("username").that.is.a("string");
  });
  it("Delete comment of note", async () => {
    const result = await noteService.deleteCommentNoteRelation(
      noteIdCreated,
      commentIdCreated
    );
    // console.log("Delete comment", result)
    expect(result).to.be.an("object");
    expect(result).to.have.property("id").that.is.a("number");
    expect(result).to.have.property("note_id").that.is.equal(noteIdCreated);
    expect(result)
      .to.have.property("comment_id")
      .that.is.equal(commentIdCreated);
  });
  it("Delete a note", async () => {
    const result = await noteService.deleteNote(noteIdCreated);
    expect(result).to.be.an("object");
    expect(result).to.have.property("id").that.is.equal(noteIdCreated);
  });
});
