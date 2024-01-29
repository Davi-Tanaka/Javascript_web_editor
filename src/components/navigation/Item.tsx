import "@styles/components/navigation/Item.scss";
import { memo } from "react";

interface ItemProps {
  googleIcon?: string,
  value: string,
  goTo: string
}

function Item(prop: ItemProps) {
  return(
    <li className="item">
      <a href={prop.goTo} className="hyper-link">
        <div className="icon-wrapper">
          <span className="material-symbols-outlined">
            { prop.googleIcon }
          </span>
        </div>
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