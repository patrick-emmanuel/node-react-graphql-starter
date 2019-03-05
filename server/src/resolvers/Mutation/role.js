const role = {
  async createRole(parent, { data }, { prisma }) {
    const role = await prisma.createRole({ ...data });
    return {
      ...role
    };
  }
};

export default role;