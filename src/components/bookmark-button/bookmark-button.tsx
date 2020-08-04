import * as React from "react";

enum Size {WIDTH = 18, HEIGHT = 19}

enum BigSize {WIDTH = 31, HEIGHT = 33}

interface Props {
  blockClassName: string;
  isActive: boolean;
  isBig: boolean;
  onClick: () => void;
}

const BookmarkButton: React.FC<Props> = ({blockClassName, isActive, isBig, onClick}: Props) => {
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

export default BookmarkButton;
