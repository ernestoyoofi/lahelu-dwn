"use client";
import Link from "next/link"
import __url from "parse-url"
import { useState } from "react"

export default function UiClicked() {
  const [getId, setId] = useState("/")

  const setData = () => {
    function get_urlPs(url) {
      if(!url || !url.match("lahelu.com/post")) {
        return {
          errorParse: true
        }
      }
      const parse = __url(url)
      const ptSplit = parse.pathname.split("/")
      const isPost = Array.isArray(ptSplit)? ptSplit[1] === "post"? true:false:false
    
      return {
        errorParse: parse.parse_failed,
        isPost: isPost,
        postId: isPost? ptSplit[2]:undefined
      }
    }
    const getValue = document.getElementById("set-url").value
    if(getValue.match("lahelu.com/post")) {
      setId(`/${get_urlPs(getValue).postId}`)
    }
  }
  return (
    <div className="entered">
      <div className="box-form">
        <input
          placeholder='URL "https://lahelu.com/post/PVvmqL0Wp"'
          id="set-url"
          onChange={setData}
        />
        <Link href={getId} btn-hit-enter="set-sub">Start</Link>
      </div>
    </div>
  )
}