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
  if (name.length > 15) {
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

export const adaptNameUser = (name = "") => {
  const labelName = name.split(" ");

  return labelName[0] + " " + labelName[-1];
};
