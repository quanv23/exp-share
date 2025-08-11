/**
 * React component that acts as a helper for displaying a modal.
 * Provides the background that overlays all content on the page as well as centering it's children
 * @module
 */
'use client';

import { useState, useEffect } from 'react';

/**
 * Represents the props for the modal
 */
export interface Props {
	/**
	 * Determines whether to display the modal or not
	 */
	isOpen: Boolean;
	/**
	 * Click event handler that closes the modal. Typically by negating the isOpen state
	 */
	onClose: () => void;
	/**
	 * The modal content to display on top of this helper component
	 */
	children: React.ReactNode;
}

export default function Modal(props: Props) {
	const { isOpen, onClose, children } = props;

	// Return nothing if modal is not open
	if (!isOpen) return null;

	return (
		<div
			className='centered-flex fixed inset-0 bg-myLightGray/50 backdrop-blur-sm z-50'
			onClick={onClose}
		>
			<div
				onClick={(event: React.MouseEvent<HTMLElement>) =>
					event.stopPropagation()
				}
			>
				{children}
			</div>
		</div>
	);
}
