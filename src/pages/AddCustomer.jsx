import React, { useState, useEffect } from 'react'
import { Fragment } from 'react'
import '../styles/AddCustomer.css'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import user from '../assets/user.png'
import check from '../assets/check.png'

const AddCustomer = () => {
  let fetchedData
  const [submitCheck, setSubmitCheck] = useState(0)
  const [customerID, setCustomerID] = useState('BXYC-76901')
  const [churnText, setChurnText] = useState('Churner')
  const [customers, setCustomers] = useState([])

  const handleChange = () => {
    setSubmitCheck(0)
  }

  const handleAddCustomer = customer => {
    setCustomers([...customers, customer])
  }

  function AddCustomerForm ({ onAddCustomer }) {
    const [currentPage, setCurrentPage] = useState(1)
    const [churnValue, setChurnValue] = useState(0)
    const [city, setCity] = useState('')
    const [age, setAge] = useState(NaN)
    const [zipCode, setZipCode] = useState(NaN)
    const [population, setPopulation] = useState(NaN)
    const [streamingMusic, setStreamingMusic] = useState('')
    const [latitude, setLatitude] = useState(NaN)
    const [longitude, setLongitude] = useState(NaN)
    const [dependents, setDependents] = useState('')
    const [noOfDependents, setNoOfDependents] = useState(NaN)
    const [cltv, setCltv] = useState(NaN)
    const [contract, setContract] = useState('')
    const [paperlessBilling, setPaperlessBilling] = useState('')
    const [internetType, setInternetType] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('')
    const [monthlyCharges, setMonthlyCharges] = useState(NaN)
    const [totalRegularCharges, setTotalRegularCharges] = useState(NaN)
    const [totalExtraDataCharges, setTotalExtraDataCharges] = useState(NaN)
    const [totalLongDistanceCharges, setTotalLongDistanceCharges] =
      useState(NaN)
    const [referredAFriend, setReferredAFriend] = useState('')
    const [noOfReferrals, setNoOfReferrals] = useState(NaN)
    const [tenureInMonths, setTenureInMonths] = useState(NaN)
    const [avgMonthlyLongDistanceCharges, setAvgMonthlyLongDistanceCharges] =
      useState(NaN)
    const [avgMonthlyGBDownload, setAvgMonthlyGBDownload] = useState(NaN)

    const totalPages = 4 // Total number of pages

    const handleSubmit = e => {
      e.preventDefault()

      if (currentPage === 1) {
        setCurrentPage(currentPage + 1)
      } else if (currentPage === 2) {
        setCurrentPage(currentPage + 1)
      } else if (currentPage === 3) {
        setCurrentPage(currentPage + 1)
      } else {
        const customer = {
          'referred a friend': referredAFriend,
          'number of referrals': noOfReferrals,
          'tenure in months': tenureInMonths,
          'avg monthly long distance charges': avgMonthlyLongDistanceCharges,
          'internet type': internetType,
          'avg monthly gb download': avgMonthlyGBDownload,
          'streaming music': streamingMusic,
          contract: contract,
          'paperless billing': paperlessBilling,
          'payment method': paymentMethod,
          'monthly charge': monthlyCharges,
          'total regular charges': totalRegularCharges,
          'total extra data charges': totalExtraDataCharges,
          'total long distance charges': totalLongDistanceCharges,
          age: age,
          dependents: dependents,
          'number of dependents': noOfDependents,
          city: city,
          'zip code': zipCode,
          latitude: latitude,
          longitude: longitude,
          population: population,
          'churn value': churnValue,
          cltv: cltv
        }

        onAddCustomer(customer)

        // Clear form fields
        setReferredAFriend('')
        setNoOfReferrals(NaN)
        setTenureInMonths(NaN)
        setAvgMonthlyLongDistanceCharges(NaN)
        setInternetType('')
        setAvgMonthlyGBDownload(NaN)
        setStreamingMusic('')
        setContract('')
        setPaperlessBilling('')
        setPaymentMethod('')
        setMonthlyCharges(NaN)
        setTotalRegularCharges(NaN)
        setTotalExtraDataCharges(NaN)
        setTotalLongDistanceCharges(NaN)
        setAge(NaN)
        setDependents('')
        setNoOfDependents(NaN)
        setCity('')
        setZipCode(NaN)
        setLatitude(NaN)
        setLongitude(NaN)
        setPopulation(NaN)
        setChurnValue('')
        setCltv(NaN)

        setCurrentPage(1) // Reset to the first page
      }
    }

    const addPrompt = event => {
      event.preventDefault()
      const submitData = {
        'referred a friend': referredAFriend,
        'number of referrals': noOfReferrals,
        'tenure in months': tenureInMonths,
        'avg monthly long distance charges': avgMonthlyLongDistanceCharges,
        'internet type': internetType,
        'avg monthly gb download': avgMonthlyGBDownload,
        'streaming music': streamingMusic,
        contract: contract,
        'paperless billing': paperlessBilling,
        'payment method': paymentMethod,
        'monthly charge': monthlyCharges,
        'total regular charges': totalRegularCharges,
        'total extra data charges': totalExtraDataCharges,
        'total long distance charges': totalLongDistanceCharges,
        age: age,
        dependents: dependents,
        'number of dependents': noOfDependents,
        city: city,
        'zip code': zipCode,
        latitude: latitude,
        longitude: longitude,
        population: population,
        'churn value': churnValue,
        cltv: cltv
      }
      console.log(submitData)
      setSubmitCheck(1)

      let response = fetch('https://fyp-model-api.onrender.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      })
        .then(response => response.json())
        .then(data => {
          // console.log(data)
          console.log(data)
          fetchedData = data
          console.log(fetchedData)
          if (fetchedData.result === 0) {
            churnText = 'Non-Churner'
          } else if (fetchedData.result === 1) {
            churnText = 'Churner'
          } else if (fetchedData.result === -1) {
            churnText = 'Undecided'
          }
          console.log(churnText)

          // setChurnValue(data)
          return data
        })
        .catch(error => {
          console.log(error)
        })
    }

    const renderFormInputs = () => {
      if (currentPage === 1) {
        return (
          <div>
            <label className='ageText'>Age</label>
            <input
              className='AgeTextbox'
              type='number'
              value={age}
              onChange={e => setAge(e.target.value)}
            />
            <label className='cityText'>City</label>
            <input
              className='CityTextbox'
              type='text'
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <label className='zipCodeText'>ZipCode</label>
            <input
              className='zipCodeTextbox'
              type='number'
              value={zipCode}
              onChange={e => setZipCode(e.target.value)}
            />
            <label className='populationText'>Population</label>
            <input
              className='populationTextbox'
              type='number'
              value={population}
              onChange={e => setPopulation(e.target.value)}
            />
            <label className='longitudeText'>Longitude</label>
            <input
              className='longitudeTextbox'
              type='number'
              value={longitude}
              onChange={e => setLongitude(e.target.value)}
            />
            <label className='latitudeText'>Latitude</label>
            <input
              className='latitudeTextbox'
              type='number'
              value={latitude}
              onChange={e => setLatitude(e.target.value)}
            />
            <button type='submit' className='submitbutton'>
              Next Page
            </button>
          </div>
        )
      } else if (currentPage === 2) {
        return (
          <div>
            <label className='streamingMusicText'>Streaming Music</label>
            <select
              className='streamingMusicTextbox'
              value={streamingMusic}
              onChange={e => setStreamingMusic(e.target.value)}
            >
              <option value='' disabled selected>
                Select
              </option>
              <option value='Yes'>Yes</option>
              <option value='No'>No</option>
            </select>
            <label className='dependentsText'>Dependents</label>
            <select
              className='dependentsTextbox'
              value={dependents}
              onChange={e => setDependents(e.target.value)}
            >
              <option value='' disabled selected>
                Select
              </option>
              <option value='Yes'>Yes</option>
              <option value='No'>No</option>
            </select>
            <label className='noOfDependentsText'>Number of Dependents</label>
            <input
              className='noOfDependentsTextbox'
              type='number'
              value={noOfDependents}
              onChange={e => setNoOfDependents(e.target.value)}
            />
            <label className='cltvText'>CLTV</label>
            <input
              className='cltvTextbox'
              type='number'
              value={cltv}
              onChange={e => setCltv(e.target.value)}
            />
            <label className='contractText'>Contract</label>
            <select
              className='contractTextbox'
              value={contract}
              onChange={e => setContract(e.target.value)}
            >
              <option value='' disabled selected>
                Select
              </option>
              <option value='Month-to-Month'>Month-to-Month</option>
              <option value='One Year'>One Year</option>
              <option value='Two Year'>Two Year</option>
            </select>
            <label className='paperlessBillingText'>Paperless Billing</label>
            <select
              className='paperlessBillingTextbox'
              value={paperlessBilling}
              onChange={e => setPaperlessBilling(e.target.value)}
            >
              <option value='' disabled selected>
                Select
              </option>
              <option value='Yes'>Yes</option>
              <option value='No'>No</option>
            </select>
            <button type='submit' className='submitbutton'>
              Next Page
            </button>
          </div>
        )
      } else if (currentPage === 3) {
        return (
          <div>
            <label className='internetTypeText'>Internet Type</label>
            <select
              className='internetTypeTextbox'
              value={internetType}
              onChange={e => setInternetType(e.target.value)}
            >
              <option value='' disabled selected>
                Select
              </option>
              <option value='Fiber Optic'>Fiber Optic</option>
              <option value='Cable'>Cable</option>
              <option value='DSL'>DSL</option>
            </select>
            <label className='paymentMethodText'>Payment Method</label>
            <select
              className='paymentMethodTextbox'
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value)}
            >
              <option value='' disabled selected>
                Select
              </option>
              <option value='Bank Withdrawal'>Bank Withdrawal</option>
              <option value='Credit Card'>Credit Card</option>
              <option value='Mailed Check'>Mailed Check</option>
            </select>
            <label className='monthlyChargesText'>Monthly Charge</label>
            <input
              className='monthlyChargesTextbox'
              type='number'
              value={monthlyCharges}
              onChange={e => setMonthlyCharges(e.target.value)}
            />
            <label className='charges1Text'>Total Regular Charges</label>
            <input
              className='charges1Textbox'
              type='number'
              value={totalRegularCharges}
              onChange={e => setTotalRegularCharges(e.target.value)}
            />
            <label className='charges2Text'>Total Extra Data Charges</label>
            <input
              className='charges2Textbox'
              type='number'
              value={totalExtraDataCharges}
              onChange={e => setTotalExtraDataCharges(e.target.value)}
            />
            <label className='charges3Text'>Total Long Distance Charges</label>
            <input
              className='charges3Textbox'
              type='number'
              value={totalLongDistanceCharges}
              onChange={e => setTotalLongDistanceCharges(e.target.value)}
            />
            <button type='submit' className='submitbutton'>
              Next Page
            </button>
          </div>
        )
      } else if (currentPage === 4) {
        return (
          <div>
            <label className='referredAFriendText'>Referred a Friend</label>
            <select
              className='referredAFriendTextbox'
              value={referredAFriend}
              onChange={e => setReferredAFriend(e.target.value)}
            >
              <option value='' disabled selected>
                Select
              </option>
              <option value='Yes'>Yes</option>
              <option value='No'>No</option>
            </select>
            <label className='noOfReferralText'>Number of Referral</label>
            <input
              className='noOfReferralTextbox'
              type='number'
              value={noOfReferrals}
              onChange={e => setNoOfReferrals(e.target.value)}
            />
            <label className='tenureInMonthsText'>Tenure in Months</label>
            <input
              className='tenureInMonthsTextbox'
              type='number'
              value={tenureInMonths}
              onChange={e => setTenureInMonths(e.target.value)}
            />
            <label className='charge4Text'>
              Avg Monthly Long Distance Charges
            </label>
            <input
              className='charge4Textbox'
              type='number'
              value={avgMonthlyLongDistanceCharges}
              onChange={e => setAvgMonthlyLongDistanceCharges(e.target.value)}
            />
            <label className='charge5Text'>Avg Monthly GB Download</label>
            <input
              className='charge5Textbox'
              type='number'
              value={avgMonthlyGBDownload}
              onChange={e => setAvgMonthlyGBDownload(e.target.value)}
            />
            <button type='submit' onClick={addPrompt} className='submitbutton'>
              Submit
            </button>
          </div>
        )
      }
    }

    return (
      <form className='Text' onSubmit={handleSubmit}>
        {renderFormInputs()}
      </form>
    )
  }

  return (
    <Fragment>
      <Header />
      <Sidebar />
      <h1 className='welcomeetxt'>
        Add <span className='welcomeetxtspan'>Customer</span>
      </h1>
      <img className='wave2' src={user} alt='user' />
      {submitCheck === 0 && (
        <AddCustomerForm onAddCustomer={handleAddCustomer} />
      )}
      {submitCheck === 1 && (
        <Fragment>
          <div className='resultBox'>
            <div className='promptText1'>CUSTOMER ADDED SUCCESSFULLY!</div>
            <img className='tick' src={check} alt='check' />
            <div className='resultIDtag'>{customerID}</div>

            {<div className='resultStatustag'>{churnText}</div>}
            {/* <div className='resultStatustag'>Non-Churner</div> */}
          </div>
          <button className='addbutton' onClick={handleChange}>
            Add Another Customer
          </button>
        </Fragment>
      )}
    </Fragment>
  )
}

export default AddCustomer
