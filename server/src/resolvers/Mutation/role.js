const role = {
  async createRole(parent, { data }, { prisma }) {
    return await prisma.createRole({ ...data });
  }
};

export default role;