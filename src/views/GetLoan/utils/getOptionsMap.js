export default function getOptionsMap(options) {
  return options.reduce((map, option) => {
    map[option.value] = option.name; // eslint-disable-line no-param-reassign
    return map;
  }, {});
}
