import { getUserId } from '../../utils';

const user = {
  loggedInUser(parent, args, context) {
    const id = getUserId(context)
    return context.prisma.user({ id })
  },
}

export default user;