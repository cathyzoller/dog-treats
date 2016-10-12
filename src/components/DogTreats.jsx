import React from 'react'
import { FormattedMessage } from 'react-intl'

const DogTreats = () => (
  <div>
    <h2>
      <FormattedMessage
        id={'dogTreats.bark'}
        defaultMessage={'Bow Wow'}
      />
    </h2>
  </div>
)

export default DogTreats
