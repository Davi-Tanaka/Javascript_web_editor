import "@styles/components/BluredBackground.scss";

function BluredBackground({ children }) {
  return(
    <div className="screen">
      { children }
    </div>
  )
}

export default BluredBackground;