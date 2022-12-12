import React from 'react'
import { useState, useEffect } from 'react'
import InfoPanel from './InfoPanel.jsx'
import Description from './Description.jsx'
import Gallery from './Gallery.jsx'
import axios from 'axios'

export default function OverviewWidget({ appState, setAppState }) {
  const api = process.env.API_URL
  const fetchheaders = {
    Authorization: process.env.API_TOKEN,
  }
  const [item, setItem] = useState([])
  const [styles, setAllStyles] = useState([])
  const [selectedStyle, setSelectedStyle] = useState([])

  const fetchItem = async () => {
    const item = await axios.get(process.env.API_URL + '/products/37315', {
      headers: fetchheaders,
    })
    setItem(item.data)
    return item.data
  }

  const fetchStyles = async (id) => {
    const styles = await axios.get(`${api}/products/${id}/styles`, {
      headers: fetchheaders,
    })
    setAllStyles(styles.data.results)
    return styles.data.results
  }
  const getDefaultStyle = (data) => {
    let defaultStyle = data.filter((el) => el['default?'] === true)
    setSelectedStyle(defaultStyle)
  }

  useEffect(() => {
    fetchItem().then((data) => {
      fetchStyles(data.id).then((data) => {
        getDefaultStyle(data)
      })
    })
  }, [])

  console.log(appState)
  if (item.id && styles.length > 0 && selectedStyle.length > 0) {
    return (
      <>
        {/* <div className="overview"> */}
        <div className="gallerycart">
          <Gallery selectedStyle={selectedStyle} />

          <InfoPanel
            setAppState={setAppState}
            appState={appState}
            fetchStyles={fetchStyles}
            item={item}
            styles={styles}
            setAllStyles={setAllStyles}
            selectedStyle={selectedStyle}
            setSelectedStyle={setSelectedStyle}
          />
        </div>
        {/* <Description product={product} /> */}
        {/* </div> */}
      </>
    )
  } else {
    return <div>Loading...</div>
  }
}
