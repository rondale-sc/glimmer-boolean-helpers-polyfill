export default function truthConvert(result) {
  const truthy = result;
  if (typeof truthy === 'boolean') { return truthy; }

  if (Array.isArray(result)) {
    return result.length !== 0;
  } else {
    return !!result;
  }
}