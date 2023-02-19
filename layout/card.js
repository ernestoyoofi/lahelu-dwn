export default function UiCards({ data }) {
  console.log(data)
  if(data.error) {
    return (
      <div className="ui-center">
        <p>Error, mungkin halaman atau postingan tidak ada</p>
      </div>
    )
  }
  return (
    <div className="cards">
      <div className="box">
        <h3><a href={`https://lahelu.com/post/${data.id}`}>{data.title}</a></h3>
        <div className="media">
          {data.type === "video"?
            <video src={data.url} controls autoPlay/>:
            <img src={data.url} />
          }
        </div>
      </div>
    </div>
  )
}