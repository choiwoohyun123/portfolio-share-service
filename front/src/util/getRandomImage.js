function getRandomImage(userId) {
  const hash = [...userId].reduce((acc, char) => char.charCodeAt(0) + acc, 0);
  const imageWidth = 200 + (hash % 10) * 10;
  const imageHeight = 200 + (hash % 10) * 10;
  return `http://placekitten.com/${imageWidth}/${imageHeight}`;
}

export default getRandomImage;
