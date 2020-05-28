const Oops = () => (
  <div className='tile is-parent'>
    <article className='tile is-child notification is-danger'>
      <p className='title'>¡Oops!</p>
      <p className='subtitle'>Se produjo un error...</p>
      <div className='content'>
        Parece que se perdió la conexión a internet y no existe caché para esta solicitud. Intenta
        de nuevo, con una conexión a internet, porfavor.
      </div>
    </article>
  </div>
);

export default Oops;
