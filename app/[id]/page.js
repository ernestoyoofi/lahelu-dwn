"use client"
import { useEffect, useState } from "react"
import UiCards from "@/layout/card"

export default function Post(data) {
  const [getJsonApp, setJsonApp] = useState({})
  useEffect(() => {
    if(!document.body.getAttribute("script-run")) {
      document.body.setAttribute("script-run", "1")
      fetch(`/api/download?id=${data.params.id}`).then(_z => {
        _z.json().then(_a => {
          setJsonApp(_a)
        }).catch(_e => {
          setJsonApp({
            error: true
          })
        })
      }).catch(_e => {
        setJsonApp({
          error: true
        })
      })
    }
    console.log(data.params.id)
  })
  return (
    <div>
      <UiCards data={getJsonApp}/>
    </div>
  )
}