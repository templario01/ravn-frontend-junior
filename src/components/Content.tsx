import { useQuery } from '@apollo/client'
import React, { Fragment, useContext } from 'react'
import {
  StarwarsContext,
  StarwarsContextType,
} from '../context/StarwarsContext'
import { PERSON_BY_ID } from '../graphql/querys'
import logo from '../assets/load.gif'
import robot from '../assets/robot.json'
import Lottie from 'lottie-react'

export const Content: React.FC<any> = () => {
  const { personId } = useContext(StarwarsContext) as StarwarsContextType
  const { data, error, loading } = useQuery(PERSON_BY_ID, {
    variables: { personId },
  })

  const generalInfo = () => {
    return (personId && error) || !personId ? (
      ''
    ) : (
      <div>
        <h1 className="font-bold text-xl mt-10 mb-4 mx-10">
          General Information
        </h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between mx-10 border-b">
            <h1 className="text-slate-600 font-bold text-lg">Eye Color</h1>
            <h1 className="text-slate-600 font-bold text-lg">
              {data?.person?.eyeColor}
            </h1>
          </div>
          <div className="flex flex-row justify-between mx-10 border-b">
            <h1 className="text-slate-600 font-bold text-lg">Hair Color</h1>
            <h1 className="text-slate-600 font-bold text-lg">
              {data?.person?.hairColor}
            </h1>
          </div>
          <div className="flex flex-row justify-between mx-10 border-b">
            <h1 className="text-slate-600 font-bold text-lg">Skin Color</h1>
            <h1 className="text-slate-600 font-bold text-lg">
              {data?.person?.skinColor}
            </h1>
          </div>
          <div className="flex flex-row justify-between mx-10 border-b">
            <h1 className="text-slate-600 font-bold text-lg">Birth Year</h1>
            <h1 className="text-slate-600 font-bold text-lg">
              {data?.person?.birthYear}
            </h1>
          </div>
        </div>
        {vehiclesInfo()}
        <div className="w-72">
          <Lottie animationData={robot} loop={true}></Lottie>
        </div>
      </div>
    )
  }

  const vehiclesInfo = () => {
    return (
      <Fragment>
        {data?.person?.ships?.starships.length === 0 ? (
          ''
        ) : (
          <Fragment>
            <h1 className="font-bold text-xl mt-10 mb-4 mx-10">Vehicles</h1>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col justify-between mx-10 border-b gap-4">
                {data?.person?.ships?.starships.map(
                  ({ name }: any, index: number) => (
                    <Fragment key={index}>
                      <h1 className="text-slate-600 font-bold text-lg border-b">
                        {name}
                      </h1>
                    </Fragment>
                  )
                )}
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    )
  }

  return (
    <div className="w-full bg-white text-left">
      {personId && error && (
        <div className="pb-5 w-full flex justify-center gap-1 mt-6">
          <span className="font-bold text-red-600 text-2xl">Fail to load</span>
          &nbsp;
        </div>
      )}
      {!loading ? (
        generalInfo()
      ) : (
        <div className="pb-5 w-full flex justify-center gap-1 mt-6">
          <span className="font-bold">loading info</span>&nbsp;
          <img className="w-5" src={logo} alt="loading..." />
        </div>
      )}
    </div>
  )
}
