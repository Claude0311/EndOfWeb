/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CWidgetBrand } from '@coreui/react'
import eesa from '../../../../assets/images/eesa-icon.png'

const RecruBlock = ({ post }) => {
  const [isExpand, setIsExpand] = useState(false)
  const spec = (li) => {
    return (
      <div key={li} style={{ lineHeight: '2.5rem' }}>
        {li}
      </div>
    )
  }
  return (
    <div className="RecruBlock" key={post.id}>
      <CWidgetBrand
        className="mb-4 widgetbrand"
        headerChildren={<img className="eesa" src={eesa} alt="eesa" />}
        values={[[post.title.company_name]]}
      />
      <hr></hr>
      <div className="recrucontent">
        <h3 style={{ 'font-weight': '600' }}>{post.title.title}</h3>
        <h2 style={{ margin: '1rem 0rem', fontWeight: '600', color: 'red' }}>{post.info.salary}</h2>
        <h2 style={{ 'font-size': '1.39rem' }}>
          | {post.info.experience} | {post.info.diploma}
        </h2>
        {!isExpand && <button onClick={() => setIsExpand(true)}>Show more...</button>}
        {isExpand && (
          <>
            <h3 style={{ 'font-weight': '600', margin: '1.3rem 0 0.1rem' }}>要求條件：</h3>
            <h4>{post.spec.requirement.map((req) => spec(req))}</h4>
            <h3 style={{ 'font-weight': '600', margin: '1rem 0 0.1rem' }}>說明：</h3>
            <h4>{post.spec.description.map((des) => spec(des))}</h4>
            <button onClick={() => setIsExpand(false)}>Show less...</button>
          </>
        )}
      </div>
    </div>
  )
}
RecruBlock.propTypes = {
  post: PropTypes.object,
}

export default RecruBlock
