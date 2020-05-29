const TabItem = ({ activeCategorie, categorie, label, setActiveCategorie }) => {
  return (
    <li key={categorie} className={activeCategorie === categorie ? 'is-active' : ''}>
      {/* <a onClick={setActiveCategorie(categorie)}>{label}</a> */}
    </li>
  );
};

TabItem.propTypes = {
  activeCategorie: PropTypes.string.isRequired,
  categorie: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  setActiveCategorie: PropTypes.func.isRequired,
};

export default TabItem;
