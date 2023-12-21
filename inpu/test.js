const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getData() {
  let categories = await prisma.category.findMany({});
  let course = await prisma.course.findMany({
    orderBy:{
        id:"asc"
    }
  });
  console.log({categories,course})
}
console.log(getData());
