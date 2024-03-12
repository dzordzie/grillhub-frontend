function FilterButtons({ categories }) {
  return (
    <>
      {categories.map((category) => (
        <button className='category-button'>{category}</button>
      ))}
    </>
  )
}
export default FilterButtons
