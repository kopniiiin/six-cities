import React from "react";
import PropTypes from "prop-types";

const Size = {WIDTH: 18, HEIGHT: 19};

const BigSize = {WIDTH: 31, HEIGHT: 33};

const propTypes = {
  blockClassName: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isBig: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const BookmarkButton = ({blockClassName, isActive, isBig, onClick}) => {
  const baseClassName = `${blockClassName}__bookmark-button`;
  const activeClassName = `${baseClassName}--active`;
  const buttonClassName = `${baseClassName} ${isActive ? activeClassName : ``} button`;

  const iconClassName = `${blockClassName}__bookmark-icon`;

  const {WIDTH: width, HEIGHT: height} = isBig ? BigSize : Size;

  const text = isActive ? `In bookmarks` : `To bookmarks`;

  return (
    <button className={buttonClassName} type="button" onClick={onClick}>
      <svg className={iconClassName} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"/>
      </svg>
      <span className="visually-hidden">{text}</span>
    </button>
  );
};

BookmarkButton.propTypes = propTypes;

export default BookmarkButton;
