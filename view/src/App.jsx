import React, { useState, useRef } from 'react';
import { Form } from './components/form';
import { User } from './components/user';
import { Spinner } from './components/spinner';
import { DeleteUser } from './components/user-childrens/deleteUser';
import { BtnBlackMode } from './components/blackMode';
import { ArrowUpIcon } from './components/icons';
import { useUsers } from './hooks/controlUsers';
import { useObserverUser } from './hooks/observerUser';
import { useLazyUser } from './hooks/lazyUser';
import { useSEO } from './hooks/useSEO';

function App() {
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [submit, setSubmit] = useState(false);
  const refTimeoutDeleteAlert = useRef();
  const refSearch = useRef();

  const { controlQueryUsers, users, setUsers, countUsers, setCountUsers } = useUsers({ refSearch, setSubmit });

  const { visibleUser, noMoreUser, refContainerUsers, setVisibleUser } = useObserverUser({ users, countUsers }, { threshold: 0 });

  const { userViews } = useLazyUser({
    setVisibleUser,
    visibleUser,
    setUsers,
    refSearch
  });

  useSEO({ title: `${countUsers > 0 ? `[${countUsers}] ` : ''}DGI Carnets` });

  const classDeleteAlert = deleteAlert ? 'delete-alert delete-alert__active' : 'delete-alert';

  return (
    <>
      <BtnBlackMode />
      <h1 id="home">DGI Carnets</h1>
      <header>
        <nav className="form">
          <Form userViews={userViews} refSearch={refSearch} submit={submit} controlQueryUsers={controlQueryUsers} />

          {countUsers > 0 && <p className="form--data-length">{`${countUsers} Usuarios`}</p>}
        </nav>
      </header>
      <main>
        <section className="user-propertys">
          <h3>Cédula</h3>
          <h3>Nombre</h3>
          <h3>Fecha</h3>
          <h3>Entregado</h3>
        </section>
        <div className={classDeleteAlert}>Removido exitosamente</div>
        <section aria-label="Registro de usuarios" role="list" ref={refContainerUsers}>
          {users ? (
            users.map((user) => {
              return (
                <User {...user} key={user.id}>
                  <DeleteUser deleteAlert={deleteAlert} setDeleteAlert={setDeleteAlert} refTimeoutDeleteAlert={refTimeoutDeleteAlert} setCountUsers={setCountUsers} setUsers={setUsers} id={user.id} />
                </User>
              );
            })
          ) : (
            <article>
              <h2>Usuario no encontrado</h2>
            </article>
          )}
        </section>
        {noMoreUser && <h2>No se encuentran más usuarios con los datos proporcionados</h2>}
        {visibleUser && <Spinner />}
        <a role="button" title="Ir al inicio" href="#home" className="scroll-top">
          <ArrowUpIcon />
        </a>
      </main>
    </>
  );
}

export default App;
