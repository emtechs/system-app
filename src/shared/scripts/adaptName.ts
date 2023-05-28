export const adaptName = (name: string) => {
  if (name.length > 27) {
    const displayName = name.split(" ");
    return (
      displayName[0] +
      " " +
      displayName[1] +
      " " +
      displayName[2] +
      " " +
      displayName[3][0] +
      "." +
      " " +
      displayName[4]
    );
  }
  return name;
};
