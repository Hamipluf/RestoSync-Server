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
    is_completed: false,
  };
  let noteIdCreated;

  it("Create a note", async () => {
    const result = await noteService.createNote(newNoteData, 2); // 2 es id de Ramiro
    noteIdCreated = result.id;
    expect(result).to.be.an("object");
    expect(result).to.have.property("id");
    expect(result).to.have.property("title").that.is.equal(newNoteData.title);
    expect(result)
      .to.have.property("description")
      .that.is.equal(newNoteData.description);
    expect(result)
      .to.have.property("is_completed")
      .that.is.equal(newNoteData.is_completed);
    expect(result).to.have.property("owner_id").that.is.equal(2);
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
  it("Delete a note", async () => {
    const result = await noteService.deleteNote(noteIdCreated);
    expect(result).to.be.an("object");
    expect(result).to.have.property("id").that.is.equal(noteIdCreated);
  });
});
