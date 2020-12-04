export default function wordCase(textString) {
  if (!textString) {
    console.warn('Text string not passed to wordCase() Returning empty string')
    return ''
  } else if (typeof textString !== 'string') {
    console.warn('wordCase() did not recieve a string')
    return textString
  } else {
    return textString
      .toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ')
  }
}
