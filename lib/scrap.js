const __ch = require("cheerio").load
const axios = require("axios")
const __url = require("parse-url")

const defaultCDN = "https://cdn.lahelu.com"
const defaultMain = "lahelu.com"

function get_urlPs(url) {
  if(!url || !url.match(defaultMain)) {
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

async function postMedia(id) {
  try {
    const get = await axios(`${defaultCDN}/image-${id}`)
    return "image"
  } catch(err) {
    return "video"
  }
}

async function scrapPost(url) {
  const parse = get_urlPs(url)
  if(parse.errorParse || !parse.isPost) {
    throw new Error(`(400) Type parse is not post`)
  }
  const scrap = await axios(url)
  const $ = __ch(scrap.data)

  const dataMedia = await postMedia(parse.postId)
  const urlPost = dataMedia === "image"?
    `${defaultCDN}/image-${parse.postId}`:
    `${defaultCDN}/video-${parse.postId}`
  return {
    title: $("head title").text()?.trim(),
    thumb: `${defaultCDN}/thumbnail-${parse.postId}`,
    type: dataMedia,
    url: urlPost,
    id: parse.postId
  }
}

async function handleAPI(req, res) {
  try {
    const getPost = req.query.id?
    await scrapPost(`https://lahelu.com/post/${req.query.id}`):
    await scrapPost(req.query.url)

    return res.send(getPost)
  } catch(err) {
    const status = err.message?.slice(0, 5) === "(400)"?400:404

    return res.status(status).send({
      status: status,
      message_id: status === 400? "URL tidak valid !": "Postingan tidak ada !",
      message: status === 400? "Bad request, url not valid": `Posting ${req.query.id} is not found`
    })
  }
}
module.exports = {
  defaultCDN,
  defaultMain,
  get_urlPs,
  postMedia,
  scrapPost,
  handleAPI,
}