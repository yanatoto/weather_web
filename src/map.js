export function getUserMap(userCity) {
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${userCity}&size=500x500&key=AIzaSyDANLeEnr2Wf05hG0wxHA0Ucqz5CeZF_Cw`;
  return mapUrl;
}

export async function renderMap(el) {
  // eslint-disable-next-line no-param-reassign
  const img = document.createElement("img");
  el.appendChild(img);
}
