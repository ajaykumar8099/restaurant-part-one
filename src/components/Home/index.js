import {Component} from 'react'
import Header from '../Header'
import CustomButton from '../CustomButton'
import DishCard from '../DishCard'

class Home extends Component {
  state = {name: '', tableItemList: [], activTabId: null}

  componentDidMount() {
    this.getAllData()
  }

  getAllData = async () => {
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const fullData = {
        branchName: data[0].branch_name,
        nexturl: data[0].nexturl,
        restaurantId: data[0].restaurant_id,
        restaurantName: data[0].restaurant_name,
        tableMenuList: data[0].table_menu_list,
        restaurantImage: data[0].restaurant_image,
      }
      const {branchName, restaurantName, tableMenuList} = fullData

      const camelCaseData = tableMenuList.map(each => ({
        categoryDishes: each.category_dishes,
        menuCategory: each.menu_category,
        menuCategoryId: each.menu_category_id,
        menuCategoryImage: each.menu_category_image,
        nexturl: each.nexturl,
      }))
      this.setState({
        name: restaurantName,
        tableItemList: camelCaseData,
        activTabId: camelCaseData[0].menuCategoryId,
      })
    }
  }

  onClickBtnChage = id => {
    this.setState({activTabId: id})
  }

  render() {
    const {name, tableItemList, activTabId} = this.state
    //console.log(name, tableItemList, activTabId)

    const dishItemData = tableItemList.filter(
      each => each.menuCategoryId === activTabId,
    )

    //console.log(dishItemData[0])

    const categoryArray = dishItemData.map(({categoryDishes}) => categoryDishes)

    console.log(categoryArray)

    //here Array items are not iterate and not convert from snake to camel case
    const camelCategoryArray = categoryArray.map(each => ({
      dishAvailability: each.dish_Availability,
      dishType: each.dish_Type,
      addonCat: each.addonCat,
      dishCalories: each.dish_calories,
      dishCurrency: each.dish_currency,
      dishDescription: each.dish_description,
      dishId: each.dish_id,
      dishImage: each.dish_image,
      dishName: each.dish_name,
      dishPrice: each.dish_price,
      nexturl: each.nexturl,
    }))

    console.log(camelCategoryArray)

    //here i use forEach and it is also not work
    categoryArray.forEach(item => console.log(item))

    return (
      <div>
        <Header heading={name} />
        <h1>{name}</h1>
        <ul>
          {tableItemList.map(each => (
            <CustomButton
              key={each.menuCategoryId}
              btnData={each}
              onClickBtn={this.onClickBtnChage}
            />
          ))}
        </ul>
        <ul>
          {categoryArray.map(each => (
            <DishCard key={each.dishId} dishDetails={each} />
          ))}
        </ul>
      </div>
    )
  }
}
export default Home
