import * as React from 'react'
import CheckIcon from '@mui/icons-material/Check'

export default function Description({ product }) {
  if (product.id) {
    return (
      <div className="description-container">
        <div className="desc-facts">
          <div className="desc">
            {product.description}
            <div>{product.slogan}</div>
          </div>
          <div className="facts">
            {product.features.map((feature) => {
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
      </div>
    )
  } else {
    return <div>Loading</div>
  }
}
