function Meal({meal}) {
  const {
    name,
    description,
    meat: { typeOfCut, weightInGrams, internalTemp, ambientTemp, meatType },
    rub = {},
    createdByUser: { username },
    createdAt,
  } = meal

  const rubSpices = rub.spices?.map((spice) => (
    <li key={spice.name}>{spice.name} ({spice.weightInGrams}g)</li>
  ))

  return (
    <div className='meal-details'>
      <h2>{name}</h2>
      <p className='description'>{description}</p>
      <h3>Meat Details</h3>
      <ul>
        <li>Cut: {typeOfCut}</li>
        <li>Weight: {weightInGrams}g</li>
        <li>Internal Temp: {internalTemp}°C</li>
        <li>Ambient Temp: {ambientTemp}°C</li>
        <li>Meat Type: {meatType}</li>
      </ul>
      <h3>Rub Details</h3>
      {rub.name && (
        <>
          <p>Name: {rub.name}</p>
          <ul>Spices:</ul>
          {rubSpices}
        </>
      )}
      <h3>Created By</h3>
      <p>Username: {username}</p>
      <p>Created At: {createdAt}</p>
    </div>
  )
}
export default Meal