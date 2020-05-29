import { PaginationItem } from './';

const Pagination = ({ handlePagination, lastPage, currentPage }) => {
  return currentPage ? (
    <nav
      className='pagination is-rounded is-centered has-margin-bottom'
      role='navigation'
      aria-label='pagination'
    >
      <ul className='pagination-list'>
        {PaginationItem(handlePagination, currentPage, 1)}
        <li>
          <span className='pagination-ellipsis'>&hellip;</span>
        </li>
        {PaginationCentral(handlePagination, lastPage, currentPage)}
        <li>
          <span className='pagination-ellipsis'>&hellip;</span>
        </li>
        {PaginationItem(handlePagination, currentPage, lastPage)}
      </ul>
    </nav>
  ) : (
    ``
  );
};

const PaginationCentral = (handlePagination, lastPage, currentPage) => {
  const pageNumber = parseInt(currentPage, 10);
  const pages = [pageNumber - 1, pageNumber, pageNumber + 1];
  const arrPages = pages.filter(pag => 1 <= pag && pag <= lastPage);
  return arrPages.map((pag, i) => PaginationItem(handlePagination, currentPage, pag, i));
};

export default Pagination;
