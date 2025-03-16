import { useEffect, useState } from 'react'
import Compressor from 'compressorjs'
import ApiService from '../service/ApiService'
import './NewMealPage.css'
import { useNavigate } from 'react-router-dom'

function NewMealPage() {
  const navigate = useNavigate()

  const [isSubmitting, setIsSubmitting] = useState(false)

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


  useEffect(() => {
    const handleKeyDown = (event) => {
      const isTextArea = event.target.tagName === 'TEXTAREA'

      if (!isTextArea && event.key === 'Enter') {
        event.preventDefault() // Zablokovanie Enteru na odoslanie formulára
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const apiService = new ApiService()

  const handleChange = (event) => {
    const { name, value, type, files, dataset } = event.target
    const parsedValue = type === 'number' ? Number(value) : value
    const label = document.querySelector(`label[for='${event.target.id}']`)

    if (type === 'file') {
      const file = files[0]
      resizeImage(file).then((base64) => {
        setFormData((prevState) => ({
          ...prevState,
          imageBase64: base64,
        }))
      })

      if (file) {
        label.innerHTML = `Image selected: <span class='file-selected'>${file.name}</span>`
      } else {
        label.innerHTML = 'Upload Image'
      }
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
    setIsSubmitting(true)

    const dataToSend = {
      ...formData,
      imageBase64: formData.imageBase64,
    }

    try {
      await apiService.post('/add-new', dataToSend)
      setFormData({
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
      setIsSubmitting(false)
      navigate('/')
    } catch (error) {
      console.error('Problem with API request:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className='content'>
      <div className='new-meal-wrapper'>
        <div className='new-meal'>
          <h1 className='new-meal-heading'>Let's put something on the grill</h1>
          <form className='new-meal-form' onSubmit={handleSubmit}>
            <div className='new-meal-info'>
              <input
                className='input-box new-name'
                type='text'
                name='name'
                placeholder='Name'
                value={formData.name}
                onChange={handleChange}
              />
              <div className='input-box new-picture'>
                <label className='upload-button' htmlFor='inputFile'>
                  Upload Image
                </label>
                <input
                  id='inputFile'
                  type='file'
                  accept='image/*'
                  name='image'
                  onChange={handleChange}
                />
              </div>
              <textarea
                type='text'
                name='description'
                placeholder='Description'
                className='input-box new-description'
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className='meat-rub'>
              <fieldset className='meat-fields'>
                <legend>
                  <h3>Meat</h3>
                </legend>
                <input
                  className='input-box'
                  type='text'
                  name='typeOfCut'
                  placeholder='Type of Cut'
                  data-section='meat'
                  value={formData.meat.typeOfCut}
                  onChange={handleChange}
                />
                <input
                  className='input-box'
                  type='number'
                  name='weightInGrams'
                  placeholder='Weight (grams)'
                  data-section='meat'
                  value={formData.meat.weightInGrams}
                  onChange={handleChange}
                />
                <input
                  className='input-box'
                  type='number'
                  name='internalTemp'
                  placeholder='Internal Temp. (°C)'
                  data-section='meat'
                  value={formData.meat.internalTemp}
                  onChange={handleChange}
                />
                <input
                  className='input-box'
                  type='number'
                  name='ambientTemp'
                  placeholder='Ambient Temp. (°C)'
                  data-section='meat'
                  value={formData.meat.ambientTemp}
                  onChange={handleChange}
                />
                <select
                  className='input-box meat-type'
                  name='meatType'
                  value={formData.meat.meatType}
                  onChange={handleChange}
                  data-section='meat'
                >
                  <option selected>Meat Type</option>
                  <option value='BEEF'>Beef</option>
                  <option value='PORK'>Pork</option>
                  <option value='CHICKEN'>Chicken</option>
                  <option value='LAMB'>Lamb</option>
                  <option value='FISH'>Fish</option>
                  <option value='SEAFOOD'>Seafood</option>
                </select>
              </fieldset>
              <fieldset className='rub-fields'>
                <legend>
                  <h3>Rub</h3>
                </legend>
                <input
                  className='input-box'
                  type='text'
                  name='name'
                  placeholder='Name'
                  data-section='rub'
                  value={formData.rub.name}
                  onChange={handleChange}
                />
                <fieldset className='spice-fields'>
                  <legend>
                    <h4>Spices</h4>
                  </legend>
                  {formData.rub.spices.map((spice, index) => (
                    <div className='spice' key={index}>
                      <input
                        className='input-box spice-names'
                        type='text'
                        name='name'
                        placeholder='Spice Name'
                        value={spice.name}
                        onChange={(e) => handleSpices(index, e)}
                      />
                      <input
                        className='input-box spice-weights'
                        type='number'
                        name='weightInGrams'
                        placeholder='Weight (grams)'
                        value={spice.weightInGrams}
                        onChange={(e) => handleSpices(index, e)}
                      />
                      <button
                        className='remove-spice-btn'
                        type='button'
                        onClick={() => removeSpice(index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    className='add-spice-btn'
                    type='button'
                    onClick={addSpice}
                  >
                    Add Spice
                  </button>
                </fieldset>
              </fieldset>
            </div>
            <button
              className='new-meal-submit'
              type='submit'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending' : "Let's cook it"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default NewMealPage
