export const getPortalRoot = (id: string = "modal-root") => {
  let element = document.getElementById(id);
  if (!element) {
    element = document.createElement("div");
    element.setAttribute("id", id);
    document.body.appendChild(element);
  }
  return element;
};
