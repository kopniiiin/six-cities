const MONTHS = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];

export const extend = (target, update) => Object.assign({}, target, update);

export const pushElement = (array, element) => [...array, element];

export const replaceElement = (array, element, index) => [...array.slice(0, index), element, ...array.slice(index + 1)];

export const removeElement = (array, index) => [...array.slice(0, index), ...array.slice(index + 1)];

export const upperCaseFirstLetter = (string) => string[0].toUpperCase() + string.slice(1);

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};
