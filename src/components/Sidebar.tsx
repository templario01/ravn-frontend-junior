import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  StarwarsContext,
  StarwarsContextType,
} from '../context/StarwarsContext'
import logo from '../assets/load.gif'

export const Sidebar = () => {
  const scrollDiv = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [firstCharge, setFirstCharge] = useState<boolean>(true)
  const { people, getPeople, page, setPage } = useContext(
    StarwarsContext
  ) as StarwarsContextType

  useEffect(() => {
    startCharge()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function startCharge() {
    await getPeople()
    setFirstCharge(false)
  }

  const loadMoreItems = async () => {
    if (loading) return
    setLoading(true)
    await getPeople()
    setPage(page + 1)
    setLoading(false)
  }

  const statusEventScroll = () => {
    scrollDiv.current?.addEventListener('scroll', () => {
      const scrollTop = scrollDiv.current?.scrollTop as number
      const clientHeight = scrollDiv.current?.clientHeight as number
      const scrollHeight = scrollDiv.current?.scrollHeight as number
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        loadMoreItems()
      }
    })
  }

  statusEventScroll()

  return (
    <div
      className="sidebar-height w-96 bg-white  overflow-auto"
      ref={scrollDiv}
    >
      {firstCharge ? (
        <div className="pt-4 w-full flex justify-center gap-1">
          <span className="font-bold">loading</span>&nbsp;
          <img className="w-5" src={logo} alt="loading..." />
        </div>
      ) : (
        <ul>
          {people.map((e) => (
            <li
              className="border-b- w-full h-24 flex justify-center items-center content-center flex-col"
              key={e.name}
            >
              <h2 className="font-bold ">{e.name}</h2>
              <span className="text-slate-600">{`Specie from ${
                e.homeworld || 'n/a'
              }`}</span>
            </li>
          ))}
        </ul>
      )}
      {loading && (
        <div className="pb-5 w-full flex justify-center gap-1">
          <span className="font-bold">loading more items</span>&nbsp;
          <img className="w-5" src={logo} alt="loading..." />
        </div>
      )}
    </div>
  )
}
