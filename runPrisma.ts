const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Use Prisma Client
// To test prisma without using front end
// This code is for testing purposes only and kept intentionaly
async function main() {
  // CREATE
  // const task = await prisma.task.create({
  //   data: { 
  //       title: 'take out a trash', 
  //       color: 'red',
  //       completed: false
  //   },
  // });
  // console.log(task);

  // UPDATE
  // const task = await prisma.task.update({
  //   where: {
  //     id: 1,
  //   },
  //   data: {
  //     title: 'ake out a trash - updated',
  //   },
  // });
  // console.log(task);

  // DELETE 
  // const task = await prisma.task.delete({
  //   where: {
  //     id: 1,
  //   },
  // });
  // console.log(task);

  // GEL ALL
  const getAlltasks = await prisma.task.findMany()
  console.log('getAlltasks:',getAlltasks);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(1)
  });


