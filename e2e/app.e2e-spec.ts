import { MaterialDashboardAngularPage } from './app.po'

describe('personal-financial-management App', () => {
  let page: MaterialDashboardAngularPage

  beforeEach(() => {
    page = new MaterialDashboardAngularPage()
  })

  it('should display message saying app works', () => {
    page.navigateTo()
    expect(page.getParagraphText()).toEqual('app works!')
  })
})
