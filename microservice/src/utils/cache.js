import context from 'express-http-context';

const cached = async (id, fn) => {
  let res = context.get(id);
  if (!res) {
    res = await fn();
    context.set(id, res);
  }
  return res;
};

export default cached;