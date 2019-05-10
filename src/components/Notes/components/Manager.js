export const moveText = (text, elem) => {
  console.log(typeof elem);
  const p = document.createTextNode(text);
  elem.appendChild(p);
};
