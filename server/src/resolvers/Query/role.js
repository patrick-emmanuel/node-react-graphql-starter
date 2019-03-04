const role = {
  role(parent, { where }, context) {
    return context.prisma.roles({ where });
  },
};

export default role;
