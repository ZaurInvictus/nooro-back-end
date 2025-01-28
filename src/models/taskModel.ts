import prisma from "../config/database";

export const getAllTasks = async () => {
  return prisma.task.findMany();
};


export const createTask = async (title: string, color: string) => {
  return prisma.task.create({
    data: { title, color },
  });
};

export const updateTask = async (id: number, data: Partial<{ title: string; color: string; completed: boolean }>) => {
    const existingTask = await prisma.task.findUnique({
      where: { id },
    });
    if (!existingTask) {
      throw new Error(`Task with ID ${id} does not exist`);
    }
  return prisma.task.update({
    where: { id },
    data,
  });
};


export const deleteTask = async (id: number) => {
  const existingTask = await prisma.task.findUnique({
    where: { id },
  });
  if (!existingTask) {
    throw new Error(`Task with ID ${id} does not exist`);
  }
  return prisma.task.delete({
    where: { id },
  });
};

