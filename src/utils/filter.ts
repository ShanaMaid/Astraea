import { IInterface } from './out';

export default (blackList: string[],  interfaces: IInterface[]) => {
  return interfaces.filter((i) => {
    return !blackList.some((b) => {
      return b === `${i.method.toUpperCase()}${i.path}`;
    });
  });
};
