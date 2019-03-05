const role = {
  async role(parent, { name }, { prisma }) {
    return await prisma.role({ name });
  }
};

export default role;
