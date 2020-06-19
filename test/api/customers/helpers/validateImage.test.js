const validateImage = require('../../../../api/customers/helpers/validateImage')
const { mimeTypes } = require('../../../../config')


describe('validateImage customers helper', () => {

  it('should return true when accepted mimeType', () => {
    const testImage = {
      filename: 'testImage',
      type: mimeTypes[0]
    }

    const result = validateImage(testImage)
    expect(result).toBe(true)
  })

  it('should return false if mimeType is not accepted', () => {
    const testPdf = {
      filename: 'testPdf',
      type: 'document/pdf'
    }

    const result = validateImage(testPdf)
    expect(result).toBe(false)
  })

})