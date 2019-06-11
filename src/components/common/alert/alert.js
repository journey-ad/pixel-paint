import Instance from './instance.js'

let alertInstance

function getAlertInstance () {
  alertInstance = alertInstance || Instance.newInstance()
  return alertInstance
}

function alert ({ title = 'Alert', content = '' }) {
  let instance = getAlertInstance()
  instance.show({
    title,
    content
  })
}
export default alert
