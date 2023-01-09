/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
import { tsQuerySelector } from '../../components/helpers';
import { setQueryParam } from './queryParams';

import { Query } from '../../components/constants';

 const setSearch = () => {
  const inputSearch = tsQuerySelector<HTMLInputElement>(
    document,
    '.products-search__input'
  );

  inputSearch.addEventListener('input', () => {
    if (inputSearch.value === '') {
      const searchParams = new URLSearchParams(`${window.location.hash}`.slice(1));
      searchParams.delete(Query.search);
      return (window.location.hash = `${searchParams.toString()}`);
    }
    setQueryParam('search', inputSearch.value.toLocaleLowerCase());
  });
};
export default setSearch
