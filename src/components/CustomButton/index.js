const CustomButton = props => {
  const {btnData, onClickBtn} = props
  const {menuCategory, menuCategoryId} = btnData

  const onClickChange = () => {
    onClickBtn(menuCategoryId)
  }

  return (
    <li>
      <button type="button" onClick={onClickChange}>
        {menuCategory}
      </button>
    </li>
  )
}
export default CustomButton
