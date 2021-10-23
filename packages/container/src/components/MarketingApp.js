import React, { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useHistory } from 'react-router-dom'
import { mount } from 'marketing/MarketingApp'

const MarketingApp = () => {
  const ref = useRef(null)
  const history = useHistory()

  useEffect(() => {
    let current = ref.current

    const { onParentNavigate } = mount(current, {
      initialPath: history.location.pathname,
      onNavigate({ pathname: nextPathname }) {
        const { pathname } = history.location

        if(pathname !== nextPathname) {
          history.push(nextPathname)
        }
      }
    })

    history.listen(onParentNavigate)

    return () => {
      ReactDOM.unmountComponentAtNode(current)
    }
  }, [])

  return <div ref={ref} />
}

export default MarketingApp