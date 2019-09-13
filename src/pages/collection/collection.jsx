import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item'
import { selectCollection } from '../../redux/shop/shop.selectors'

import './collection.scss';


const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  return (
    <div className='collection-page'>
      <h2 className='title'> {title}</h2>
      <div className='items'>
        {
          items.map(item => <CollectionItem key={item.id} item={item} />)
        }
      </div>
    </div>
  )
}

// the second parameter gets all of the props associated with this component (CollectionPage)
// Remember:  selectCollection is a function that returns a function (curries a funcion)
//            the function that is returned accepts a parameter (which should be the state)
const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);