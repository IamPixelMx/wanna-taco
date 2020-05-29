const ItemPagination = (handlePagination, currentPage, page, i) => {
  const currentPageNumber = parseInt(currentPage, 10);

  return (
    <li>
      <a
        className={currentPageNumber == page ? 'pagination-link is-current' : 'pagination-link'}
        aria-label={currentPageNumber == page ? 'Page ' + page : 'Goto page ' + page}
        aria-current={currentPageNumber == page ? 'page' : ''}
        name={page}
        onClick={e => handlePagination(e)}
      >
        {page}
      </a>
    </li>
  );
};

export default ItemPagination;
