import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import InfoPanel from './InfoPanel.jsx'
import Description from './Description.jsx'
import Gallery from './Gallery.jsx'
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Authorization: process.env.API_TOKEN,
  },
})
const OverviewWidget = React.memo(({ appState, setAppState }) => {
  const [item, setItem] = useState([])
  const [styles, setAllStyles] = useState([])
  const [selectedStyle, setSelectedStyle] = useState([])

  const fetchItem = async () => {
    const item = await api.get(`/products/${appState.productId}`)
    setItem(item.data)
  }

  const fetchStyles = async () => {
    const styles = await api.get(`/products/${appState.productId}/styles`)
    setAllStyles(styles.data.results)
    return styles.data.results
  }
  const getDefaultStyle = (data) => {
    let defaultStyle = data.filter((el) => el['default?'] === true)
    setSelectedStyle(defaultStyle)
  }

  const fetchStylesMemo = useCallback(fetchStyles, [])

  useEffect(() => {
    const fetchData = async () => {
      const item = await fetchItem()
      const styles = await fetchStyles()
      getDefaultStyle(styles)
    }
    fetchData()
  }, [])

  return (
    item.id &&
    styles.length > 0 &&
    selectedStyle.length > 0 && (
      <>
        <div className="overview" id="overview-section">
          <div className="gallerycart">
            <Gallery selectedStyle={selectedStyle} />

            <InfoPanel
              setAppState={setAppState}
              appState={appState}
              fetchStyles={fetchStylesMemo}
              item={item}
              styles={styles}
              setAllStyles={setAllStyles}
              selectedStyle={selectedStyle}
              setSelectedStyle={setSelectedStyle}
            />
          </div>
          <Description item={item} />
        </div>
      </>
    )
  )
})

export default OverviewWidget
