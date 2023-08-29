import styles from './lazyList.module.css'
import { useEffect, useRef, useState } from "react";

const data = Array.from({ length: 100 }).map((_, index) => {
  return index + 1
})

const itemHeight = 60

export default function LazyList() {
  const [scrollTop, setScrollTop] = useState(0)
  const [scrollHeight, setScrollHeight] = useState(0)

  const scrollRef = useRef()

  const onListScroll = (e) => {
    setScrollHeight(e.currentTarget.scrollHeight)
    setScrollTop(e.currentTarget.scrollTop)

    e.preventDefault()
    e.stopPropagation()
  }

  useEffect(() => {
    if (!scrollRef.current) {
      return;
    }

    console.log(scrollTop / itemHeight)

    scrollRef.current.scrollTop = scrollTop
  }, [scrollTop, scrollRef])

  const startRenderIndex = Math.floor(scrollTop / itemHeight)

  const endRenderIndex = startRenderIndex + 5 < data.length ? startRenderIndex + 5 : data.length

  console.log({
    scrollTop,
    bottom: (data.length - endRenderIndex) * itemHeight,
    top: (startRenderIndex) * itemHeight,
    total: scrollHeight
  })


  console.log({ endRenderIndex })

  return (
    <div className={styles.container}>
      <ul id={'test123'} ref={scrollRef} onScroll={onListScroll} className={styles.list}>
        <div style={{ width: '100%', height: (startRenderIndex) * itemHeight, backgroundColor: '#fff'}}/>

        {
          Array.from({ length: endRenderIndex - startRenderIndex  }).map((_, index) => {
            return (
              <li key={index}>
                {data[startRenderIndex + index]}
              </li>
            )
          })
        }

        <div style={{ width: '100%', height: (data.length - endRenderIndex) * itemHeight, backgroundColor: '#fff'}}/>
      </ul>
    </div>
  )
}