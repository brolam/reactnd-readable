import pathToRegexp from 'path-to-regexp'
//Home Url
export const GO_HOME = '/';

//GET Post
export const GO_POST_NEW = '/posts/new';
export const GO_POST_GET = '/posts/:id/:action/:commentId?/:commentAction?/';
export const POST_URL_ACTIONS = {
  get: 'get',
  edit: 'edit',
  delete: 'delete',
  comments: 'comments'
}
export const COMMENT_URL_ACTIONS = {
  new: 'new',
  edit: 'edit',
  delete: 'delete',
}
export const getPostPathToRegexp = pathToRegexp.compile(GO_POST_GET)
export const getPostPageUrl = postId => (getPostPathToRegexp({ id: postId, action: POST_URL_ACTIONS.get }))

//GET posts by categoreis 
export const GO_HOME_FILTER = '/:categoryPath/posts';
export const getHomeFilterPathToRegexp = pathToRegexp.compile(GO_HOME_FILTER)

export function isHomeUrl(url) {
  return (
    pathToRegexp(GO_HOME).test(url) ||
    pathToRegexp(GO_POST_NEW).test(url)
  )
}

export function isHomeFilterByCategoryUrl(url) {
  return (pathToRegexp(GO_HOME_FILTER).test(url))
}

export function getHomePropsByUrl(url) {
  let selectedCategoryPathFilter = 'none'
  if (isHomeFilterByCategoryUrl(url)) {
    const params = pathToRegexp(GO_HOME_FILTER).exec(url)
    selectedCategoryPathFilter = params[1]
  }
  return ({
    isNewPost: pathToRegexp(GO_POST_NEW).test(url) === true,
    selectedCategoryPathFilter,
  })
}

export function isPostPageUrl(url) {
  if (url.endsWith('/new')) return false
  return (pathToRegexp(GO_POST_GET).test(url))
}

/**
 * Returns with the PostPage Component props entered in the URL
 * @param {String} url 
 * @param {[]} selectedPostComments put the comments retrieved in the selected post
 */
export function getPostPagePropsByUrl(url, selectedPostComments) {
  if (!isPostPageUrl(url)) return {}
  const params = pathToRegexp(GO_POST_GET).exec(url)
  const postAction = params[2], commentId = params[3], commentAction = params[4]
  const comments = commentId ? selectedPostComments : []
  return ({
    isEditPost: postAction === POST_URL_ACTIONS.edit,
    isShowQuestionDelPost: postAction === POST_URL_ACTIONS.delete,
    isNewComment: (
      postAction === POST_URL_ACTIONS.comments &&
      commentId === COMMENT_URL_ACTIONS.new
    ),
    isEditComment: (
      postAction === POST_URL_ACTIONS.comments &&
      commentAction === COMMENT_URL_ACTIONS.edit
    ),
    isShowQuestionDelComment: (
      postAction === POST_URL_ACTIONS.comments &&
      commentAction === COMMENT_URL_ACTIONS.delete
    ),
    selectedComment: comments.find(comment => comment.id === commentId)
  })
}


