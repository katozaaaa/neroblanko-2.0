import 'virtual:svg-icons/register'
if (process.env.NODE_ENV === 'development') {
  import('@/main.scss')
  // It is necessary to track the insertion of styles into the head
  const observer = new MutationObserver((mutationRecord) => {
    mutationRecord.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        const addedNodes = [...mutation.addedNodes]
        if (addedNodes.some((node) => node.nodeName === 'STYLE')) {
          document.dispatchEvent(new CustomEvent('loadStyles'))
          observer.disconnect()
        }
      }
    })
  })
  observer.observe(document.head, {
    childList: true
  })
}
