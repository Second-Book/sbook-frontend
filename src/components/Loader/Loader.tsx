import LoaderStyle from "./LoaderStyle.module.css"

const Loader = () => {
  return (
    <div
    className={`${LoaderStyle.loaderOverlay} fixed inset-0 flex items-center justify-center`}
  >
    <div className={LoaderStyle.loaderContent}>
      <div className={`${LoaderStyle.spinner} ${LoaderStyle.animateSpin}`}>◌</div>
      <div className={LoaderStyle.loaderMessage}>Učitavanje...</div>
    </div>
  </div>
  )
}

export default Loader