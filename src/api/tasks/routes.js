const routes = (handler, validator) => [
  {
    method: "POST",
    path: "/task",
    handler: (request, h) => handler.postTaskHandler(request, h),
    options: {
      description: "Menambahkan task baru",
      notes: "Menerima request body berupa title (opsional), description, dueDate (optional), dan status",
      tags: ["api"],
      validate: {
        payload: validator.TaskPayloadSchema,
      },
    },
  },
  {
    method: "GET",
    path: "/task/{id}",
    handler: (request) => handler.getTaskByIdHandler(request),
    options: {
      description: "Menampilkan detail task berdasarkan id",
      notes: "Menerima request parameter berupa id dan mengembalikan response berupa detail task",
      tags: ["api"],
      validate: {
        params: validator.TaskParamSchema,
      },
    },
  },
  {
    method: "PUT",
    path: "/task/{id}",
    handler: (request) => handler.putTaskByIdHandler(request),
    options: {
      description: "Memperbarui task berdasarkan id",
      notes:
        "Menerima request parameter berupa id dan request body berupa title (opsional), description, dueDate (optional), dan status",
      tags: ["api"],
      validate: {
        payload: validator.TaskPayloadSchema,
        params: validator.TaskParamSchema,
      },
    },
  },
  {
    method: "DELETE",
    path: "/task/{id}",
    handler: (request) => handler.deleteTaskByIdHandler(request),
    options: {
      description: "Menghapus task berdasarkan id",
      notes: "Menerima request parameter berupa id dan menghapus task yang sesuai dengan id tersebut",
      tags: ["api"],
      validate: {
        params: validator.TaskParamSchema,
      },
    },
  },
];

module.exports = routes;
