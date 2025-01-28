import { Request, Response } from "express";
import { addTask, getTasks, editTask, removeTask } from "../taskController";
import { getAllTasks, createTask, updateTask, deleteTask } from "../../models/taskModel";


jest.mock("../../models/taskModel", () => ({
  getAllTasks: jest.fn(),
  createTask: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn(),
}));

describe("Task Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  describe("getTasks", () => {
    it("should return all tasks with a 200 status", async () => {
      const mockTasks = [{ id: 1, title: "Task 1", color: "blue" }];
      (getAllTasks as jest.Mock).mockResolvedValue(mockTasks);

      await getTasks(mockRequest as Request, mockResponse as Response);

      expect(getAllTasks).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockTasks);
    });
  });

  describe("addTask", () => {
    it("should create a new task and return it with a 201 status", async () => {
      const mockTask = { id: 1, title: "New Task", color: "red" };
      mockRequest.body = { title: "New Task", color: "red" };
      (createTask as jest.Mock).mockResolvedValue(mockTask);

      await addTask(mockRequest as Request, mockResponse as Response);

      expect(createTask).toHaveBeenCalledWith("New Task", "red");
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockTask);
    });

    it("should return a 400 status for invalid data", async () => {
      mockRequest.body = {}; // Invalid data

      await addTask(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(String) }));
    });
  });

  describe("editTask", () => {
    it("should update a task and return it with a 200 status", async () => {
      const mockTask = { id: 1, title: "Updated Task", color: "green" };
      mockRequest.params = { id: "1" };
      mockRequest.body = { title: "Updated Task", color: "green" };
      (updateTask as jest.Mock).mockResolvedValue(mockTask);

      await editTask(mockRequest as Request, mockResponse as Response);

      expect(updateTask).toHaveBeenCalledWith(1, { title: "Updated Task", color: "green" });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockTask);
    });

    it("should return a 400 status for invalid ID", async () => {
      mockRequest.params = { id: "invalid" };

      await editTask(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(String) }));
    });

    it("should return a 400 status for errors during update", async () => {
      mockRequest.params = { id: "1" };
      mockRequest.body = { title: "Updated Task" };
      (updateTask as jest.Mock).mockRejectedValue(new Error("Update failed"));

      await editTask(mockRequest as Request, mockResponse as Response);

      expect(updateTask).toHaveBeenCalledWith(1, { title: "Updated Task" });
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: "Update failed" });
    });
  });


  describe("removeTask", () => {
    it("should delete a task and return a 204 status", async () => {
      mockRequest.params = { id: "1" };
      (deleteTask as jest.Mock).mockResolvedValue(null);

      await removeTask(mockRequest as Request, mockResponse as Response);

      expect(deleteTask).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
    });

    it("should return a 400 status for invalid ID", async () => {
      mockRequest.params = { id: "invalid" };

      await removeTask(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(String) }));
    });

    it("should return a 400 status for errors during deletion", async () => {
      mockRequest.params = { id: "1" };
      (deleteTask as jest.Mock).mockRejectedValue(new Error("Delete failed"));

      await removeTask(mockRequest as Request, mockResponse as Response);

      expect(deleteTask).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: "Delete failed" });
    });
  });
});

