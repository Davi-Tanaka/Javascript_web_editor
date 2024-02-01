import "@styles/components/navigation/Item.scss";
import { CSSProperties, memo, useState, useRef } from "react";

interface ItemProps {
  googleIcon?: string,
  value: string,
  goTo: string,
  isActivated?: boolean | false
}

function Item(prop: ItemProps) {
  const item = useRef<HTMLLIElement>();
  const [itemIsActvated, isItemActivated] = useState(false);

  return(
    <li
      className="item" 
      ref={item} >
      <a href={prop.goTo} className="hyper-link">
        {
          (prop.googleIcon != null && prop.googleIcon != undefined)
          &&
          <div className="icon-wrapper">
            <span className="material-symbols-outlined">
              { prop.googleIcon }
            </span>
          </div>
        }
        <div className="value-wrapper">
          <span className="value">
            { prop.value }
          </span>
        </div>
      </a>
    </li>
  )
}

export default memo(Item);