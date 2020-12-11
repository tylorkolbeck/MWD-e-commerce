import { createSelector } from 'reselect'

const selectSiteData = (state) => state._siteData

export const siteMetaData = createSelector(
  [selectSiteData],
  (siteData) => siteData
)
