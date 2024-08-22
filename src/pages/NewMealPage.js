import { useState } from 'react'
import Compressor from 'compressorjs'
import ApiService from '../service/ApiService'

function NewMealPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    meat: {
      typeOfCut: '',
      weightInGrams: '',
      internalTemp: '',
      ambientTemp: '',
      meatType: '',
    },
    rub: {
      name: '',
      spices: [],
    },
    imageBase64: '',
  })

  const apiService = new ApiService()

  const handleChange = (event) => {
    const { name, value, type, files, dataset } = event.target
    const parsedValue = type === 'number' ? Number(value) : value

    if (type === 'file') {
      const file = files[0]
      resizeImage(file).then((base64) => {
        setFormData((prevState) => ({
          ...prevState,
          imageBase64: base64,
        }))
      })
    } else if (dataset.section) {
      setFormData((prevState) => ({
        ...prevState,
        [dataset.section]: {
          ...prevState[dataset.section],
          [name]: parsedValue,
        },
      }))
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: parsedValue,
      }))
    }
  }

  const resizeImage = (file) => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.6,
        maxWidth: 1000,
        maxHeight: 1000,
        success(result) {
          const reader = new FileReader()
          reader.onloadend = () => {
            resolve(reader.result)
          }
          reader.readAsDataURL(result)
        },
        error(err) {
          reject(err)
        },
      })
    })
  }

  const handleSpices = (index, event) => {
    const { name, value, type } = event.target
    const parsedValue = type === 'number' ? Number(value) : value

    const updateSpices = formData.rub.spices.map((spice, i) => {
      if (i === index) {
        return { ...spice, [name]: parsedValue }
      }
      return spice
    })

    setFormData((prevState) => ({
      ...prevState,
      rub: {
        ...prevState.rub,
        spices: updateSpices,
      },
    }))
  }

  const addSpice = () => {
    setFormData((prevState) => ({
      ...prevState,
      rub: {
        ...prevState.rub,
        spices: [...prevState.rub.spices, { name: '', weightInGrams: '' }],
      },
    }))
  }

  const removeSpice = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      rub: {
        ...prevState.rub,
        spices: prevState.rub.spices.filter((_, i) => i !== index),
      },
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const dataToSend = {
      ...formData,
      imageBase64: formData.imageBase64,
    }

    try {
      await apiService.post('/add-new', dataToSend)
      alert('Successfully sent')
    } catch (error) {
      console.error('Problem with API request:', error)
      alert('Failed to send data')
    }
  }

  return (
    <div className='content'>
      <div className='new-meal-form'>
        <h1>Let's put something on the grill</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <h3>Upload Image:</h3>
            <input type='file' name='image' onChange={handleChange} />
          </label>
          <label>
            <h3>Name:</h3>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            <h3>Description:</h3>
            <textarea
              type='text'
              name='description'
              className='new-meal-description'
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <fieldset className='meat-fields'>
            <legend>
              <h3>Meat</h3>
            </legend>
            <label>
              <h4>Type of Cut:</h4>
              <input
                type='text'
                name='typeOfCut'
                data-section='meat'
                value={formData.meat.typeOfCut}
                onChange={handleChange}
              />
            </label>
            <label>
              <h4>Weight (grams):</h4>
              <input
                type='number'
                name='weightInGrams'
                data-section='meat'
                value={formData.meat.weightInGrams}
                onChange={handleChange}
              />
            </label>
            <label>
              <h4>Internal Temp. (°C):</h4>
              <input
                type='number'
                name='internalTemp'
                data-section='meat'
                value={formData.meat.internalTemp}
                onChange={handleChange}
              />
            </label>
            <label>
              <h4>Ambient Temp. (°C):</h4>
              <input
                type='number'
                name='ambientTemp'
                data-section='meat'
                value={formData.meat.ambientTemp}
                onChange={handleChange}
              />
            </label>
            <label>
              <h4>Meat Type:</h4>
              <select
                name='meatType'
                value={formData.meat.meatType}
                onChange={handleChange}
                data-section='meat'
              >
                <option value=''>Select Meat Type</option>
                <option value='BEEF'>Beef</option>
                <option value='PORK'>Pork</option>
                <option value='CHICKEN'>Chicken</option>
                <option value='LAMB'>Lamb</option>
                <option value='FISH'>Fish</option>
                <option value='SEAFOOD'>Seafood</option>
              </select>
            </label>
          </fieldset>
          <fieldset className='rub-fields'>
            <legend>
              <h3>Rub</h3>
            </legend>
            <label>
              <h4>Name:</h4>
              <input
                type='text'
                name='name'
                data-section='rub'
                value={formData.rub.name}
                onChange={handleChange}
              />
            </label>
            <fieldset className='spice-fields'>
              <legend>
                <h4>Spices</h4>
              </legend>
              {formData.rub.spices.map((spice, index) => (
                <div key={index}>
                  <label>
                    <h4>Spice Name:</h4>
                    <input
                      type='text'
                      name='name'
                      value={spice.name}
                      onChange={(e) => handleSpices(index, e)}
                    />
                  </label>
                  <label>
                    <h4>Weight (grams):</h4>
                    <input
                      type='number'
                      name='weightInGrams'
                      value={spice.weightInGrams}
                      onChange={(e) => handleSpices(index, e)}
                    />
                  </label>
                  <button type='button' onClick={() => removeSpice(index)}>
                    Remove Spice
                  </button>
                </div>
              ))}
              <button type='button' onClick={addSpice}>
                Add Spice
              </button>
            </fieldset>
          </fieldset>
          <button type='submit'>Letsgo</button>
        </form>
      </div>
    </div>
  )
}
export default NewMealPage
