import React from 'react'

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import CollectionPreview from '../collection-preview/collection-preview';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';

import { CollectionsOverviewDiv } from './collections-overview.styles';

const CollectionsOverview = ({ collections }) => (
  <CollectionsOverviewDiv>
    {
      collections.map(({ id, ...other }) => (
        <CollectionPreview
          key={id}
          {...other}
        />
      ))}
  </CollectionsOverviewDiv>
)

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview
})
export default connect(mapStateToProps)(CollectionsOverview);