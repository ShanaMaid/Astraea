const firstWordUpper = (s: string) => {
  const temp = s.split('');
  if (temp[0]) {
    temp[0] = temp[0].toUpperCase();
  }
  return temp.join('');
};

const path2Hump = (s: string) => {
  const temp = s.split('/');
  return temp.map((item) => {
    return firstWordUpper(item.replace(/:/g, ''));
  }).join('');
};

export default {
  firstWordUpper,
  path2Hump,
};
