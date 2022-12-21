import { tsQuerySelector } from "../../components/helpers";
export const setSearch = () => {
  const inputSearch = tsQuerySelector(
    document,
    ".products-search__input"
  ) as HTMLInputElement;

  inputSearch.addEventListener("input", () => {
    let baseUrl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;

    if (inputSearch.value.length > 0) {
      let link = `?search=${inputSearch.value}`;
      let newUrl = baseUrl + link;

      history.pushState(null, "", newUrl);
    } else {
      history.pushState(null, "", baseUrl);
    }
  });
};
