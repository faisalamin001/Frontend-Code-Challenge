export function getImageSrc(imgUrl) {
  const baseUrl = import.meta.env.VITE_BASE_URL || '';
  if (imgUrl?.startsWith('.')) {
    return baseUrl + imgUrl.slice(1);
  } else {
    return imgUrl;
  }
}
