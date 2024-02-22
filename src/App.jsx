import React, { useState, useRef } from 'react';
import imgArrowUp from './assets/arrow-up.svg';
import { Form } from './components/form';
import { User } from './components/user';
import { Spinner } from './components/spinner';
import { DeleteUser } from './components/deleteUser';
import { useUsers } from './hooks/controlUsers';
import { useObserverUser } from './hooks/observerUser';
import { useLazyUser } from './hooks/lazyUser';

function App() {
	const [deleteAlert, setDeleteAlert] = useState(false);
	const [submit, setSubmit] = useState(false);
	const refTimeoutDeleteAlert = useRef();
	const refSearch = useRef();

	const { controlQueryUsers, users, setUsers, countUsers, setCountUsers } = useUsers({ refSearch, setSubmit });

	const { visibleUser, noMoreUser, refContainerUsers, setVisibleUser } = useObserverUser({ users, countUsers }, { threshold: 0 });

	const { userViews } = useLazyUser({ setVisibleUser, visibleUser, setUsers, refSearch });


	const classDeleteAlert = deleteAlert ? 'delete-alert delete-alert__active' : 'delete-alert';

	return (
		<>
			<h1 id="home">Registro de carnets</h1>
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
					<h3>ID</h3>
					<h3>Fecha</h3>
					<h3>Entregado</h3>
				</section>
				<div className={classDeleteAlert}>Removido exitosamente</div>
				<section role="section" ref={refContainerUsers}>
					{users ? (
						users.map((user) => {
							return (
								<User
									{...user}
									setUsers={setUsers}
									setCountUsers={setCountUsers}
									refTimeoutDeleteAlert={refTimeoutDeleteAlert}
									setDeleteAlert={setDeleteAlert}
									deleteAlert={deleteAlert}
									key={user.id}>
									<DeleteUser
										deleteAlert={deleteAlert}
										setDeleteAlert={setDeleteAlert}
										refTimeoutDeleteAlert={refTimeoutDeleteAlert}
										setCountUsers={setCountUsers}
										setUsers={setUsers}
										id={user.id}
									/>
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
					<img src={imgArrowUp} alt="Flecha arriba" />
				</a>
			</main>
		</>
	);
}

export default App;
