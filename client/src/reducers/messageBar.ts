import { combineReducers } from 'redux'
import { gists, messageBar, solutions, settings } from '../actions'
import { getType } from 'typesafe-actions'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'

const isVisible = (state = false, action) => {
  switch (action.type) {
    case getType(gists.create.success):
    case getType(gists.update.success):
    case getType(solutions.remove):
    case getType(settings.edit.success):
    case getType(settings.edit.failure):
    case getType(messageBar.show):
      return true
    case getType(messageBar.dismiss):
      return false
    default:
      return state
  }
}

const initialStyle = MessageBarType.info
const style = (state = initialStyle, action) => {
  switch (action.type) {
    case getType(gists.create.success):
    case getType(gists.update.success):
    case getType(settings.edit.success):
      return MessageBarType.success
    case getType(solutions.remove):
      return MessageBarType.info
    case getType(settings.edit.failure):
      return MessageBarType.error
    case getType(messageBar.show):
      return action.payload.style
    case getType(messageBar.dismiss):
      return initialStyle
    default:
      return state
  }
}

const initialText = ''
const text = (state = initialText, action) => {
  switch (action.type) {
    case getType(gists.create.success):
      return `Your gist has been published at https://gist.github.com/${
        action.payload.gist.id
      }.`
    case getType(gists.update.success):
      return `Your gist has been updated at https://gist.github.com/${
        action.payload.gist.id
      }.`
    case getType(solutions.remove):
      return `The snippet '${action.payload.name}' has been deleted.`
    case getType(settings.edit.success):
      return 'Settings successfully applied.'
    case getType(settings.edit.failure):
      return `Error in settings. ${action.payload}`
    case getType(messageBar.show):
      return action.payload.text
    case getType(messageBar.dismiss):
      return initialText
    default:
      return state
  }
}

const initialLink = null
const link = (state = initialLink, action) => {
  switch (action.type) {
    case getType(gists.create.success):
    case getType(gists.update.success):
      return {
        text: 'View on GitHub',
        url: `https://gist.github.com/${action.payload.gist.id}`,
      }
    case getType(solutions.remove):
    case getType(settings.edit.success):
    case getType(settings.edit.failure):
    case getType(messageBar.show):
    case getType(messageBar.dismiss):
      return initialLink
    default:
      return state
  }
}

export default combineReducers({
  isVisible,
  style,
  text,
  link,
})

// TODO: maybe remove
// selectors
const getVisibility = (state): boolean => state.isVisible
const getStyle = (state): MessageBarType => state.style
const getText = (state): string => state.text
const getLink = (state): string | null => state.link

export const selectors = {
  getVisibility,
  getStyle,
  getText,
  getLink,
}
