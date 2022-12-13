import * as React from 'react'
import CheckIcon from '@mui/icons-material/Check'

export default function Description({ item }) {
  let pinLogin = 'https://www.pinterest.com/login/'
  let twitterLogin = 'https://twitter.com/i/flow/login'
  let fbLogin = 'https://www.facebook.com/'

  return (
    <div className="description-container">
      <div className="desc-facts">
        <div className="desc">
          {item.description}
          <div>{item.slogan}</div>
        </div>
        <div className="facts">
          {item.features.map((feature) => {
            return (
              <span className="fact" key={feature.feature}>
                <CheckIcon />
                <span>
                  {feature.feature} {feature.value ? '--->' : ''}{' '}
                  {feature.value ? feature.value : ''}
                </span>
              </span>
            )
          })}
        </div>
      </div>
      <div className="buttonwrapper">
        <div className="sharebtns">
          <a className="twitter" href={twitterLogin} target="_blank">
            <i className="twitback"></i>
          </a>
          <a className="fb" href={fbLogin} target="_blank">
            <i className="fbback"></i>
          </a>
          <a className="pin" href={pinLogin} target="_blank">
            <i className="pinback"></i>
          </a>
        </div>
      </div>
    </div>
  )
}
