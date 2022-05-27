//A script for accessory helper functions

function truncateBody(text, len) {
  if (text.length > len && len) {
    let newText = text.substring(0, len);
    newText = newText.replace(/<(?:.|\n)*?>/gm, "");
    return newText + "...";
  } else {
    return text.replace(/<(?:.|\n)*?>/gm, "");
  }
}

export { truncateBody };
