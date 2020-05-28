import React from 'react';
import { RouterContext } from 'next/dist/next-server/lib/router-context';

const withNextRouter = (uiComponent, router = {}) => {
  const {
    route = '',
    pathname = '',
    query = {},
    asPath = '',
    push = async () => true,
    replace = async () => true,
    reload = () => null,
    back = () => null,
    prefetch = async () => undefined,
    beforePopState = () => null,
    events = {
      on: () => null,
      off: () => null,
      emit: () => null,
    },
  } = router;

  return (
    <RouterContext.Provider
      value={{
        route,
        pathname,
        query,
        asPath,
        push,
        replace,
        reload,
        back,
        prefetch,
        beforePopState,
        events,
      }}
    >
      {uiComponent}
    </RouterContext.Provider>
  );
};

export default withNextRouter;
