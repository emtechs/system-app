export const adaptName = (name = "") => {
  if (name.length > 27) {
    const displayName = name.split(" ");
    let name4 = "";
    if (displayName[4]) {
      name4 = " " + displayName[4];
    }
    if (displayName[3].length < 3) {
      return (
        displayName[0] +
        " " +
        displayName[1] +
        " " +
        displayName[2][0] +
        "." +
        name4
      );
    }
    return (
      displayName[0] +
      " " +
      displayName[1] +
      " " +
      displayName[2] +
      " " +
      displayName[3][0] +
      "." +
      name4
    );
  }
  return name;
};

export const adaptNameLabel = (name = "") => {
  const displayName = name.split(" ");
  let name4 = "";
  if (displayName[4]) {
    name4 = " " + displayName[4];
  }
  if (displayName[3].length < 3) {
    return (
      displayName[0] +
      " " +
      displayName[1] +
      " " +
      displayName[2][0] +
      "." +
      name4
    );
  }
  return (
    displayName[0] +
    " " +
    displayName[1] +
    " " +
    displayName[2] +
    " " +
    displayName[3][0] +
    "." +
    name4
  );
};

export const adaptNameUserLabel = (name = "") => {
  const displayName = name.split(" ");

  if (displayName.length === 0) return displayName;

  return [...displayName].shift() + " " + [...displayName].pop();
};
