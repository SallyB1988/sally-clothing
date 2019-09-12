import React from 'react';

// import CollectionItem from '../../components/collection-item/collection-item'

import './category.scss';


const CategoryPage = ({ match }) => (
  <div className='category'>
    <h2>CATEGORY PAGE</h2>
    <p>{match.params.categoryId}</p>
  </div>
)

export default CategoryPage;