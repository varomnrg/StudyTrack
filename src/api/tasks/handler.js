class TasksHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postTaskHandler(request, h) {
    this._validator.validateTaskPayload(request.payload);
    const { title = "untitled", description, dueDate = NULL, status } = request.payload;
    const ownerId = "user-123";
    const taskId = await this._service.addTask({
      ownerId,
      title,
      description,
      dueDate,
      status,
    });

    const response = h.response({
      status: "success",
      message: "Task berhasil ditambahkan",
      data: {
        taskId,
      },
    });

    response.code(201);
    return response;
  }

  async getTaskByIdHandler(request) {
    const { id } = request.params;
    const task = await this._service.getTaskById(id);
    return {
      status: "success",
      data: {
        task,
      },
    };
  }

  async putTaskByIdHandler(request) {
    this._validator.validateTaskPayload(request.payload);
    const { id } = request.params;
    const { title = "untitled", description, dueDate = NULL, status } = request.payload;
    await this._service.updateTaskById({
      id,
      title,
      description,
      dueDate,
      status,
    });

    return {
      status: "success",
      message: "Task berhasil diperbaharui",
    };
  }

  async deleteTaskByIdHandler(request) {
    const { id } = request.params;
    await this._service.deleteTaskById(id);
    return {
      status: "success",
      message: "Task berhasil dihapus",
    };
  }
}

module.exports = TasksHandler;
