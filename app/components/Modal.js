/**
 * <Summary> Provides an overlay for modals that positions the children in the center of the screen
 * <Example>
 *  <Modal toggleModal={toggleIsModalOpen}>
 *      <div>Children Elements<div/>
 *  <Modal />
 */
export default function Modal(props) {
	const { toggleModal, children } = props;

	return (
		<div style={styles.overlay} onClick={toggleModal}>
			<div onClick={(event) => event.stopPropagation()}>{children}</div>
		</div>
	);
}

const styles = {
	overlay: {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100vw',
		height: '100vh',
		backgroundColor: 'rgba(0,0,0,0.5)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1000,
	},
};
