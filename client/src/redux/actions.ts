import {GameType, ReplyType, User, ITheme} from '../types';
import {initialState} from './userReducer';

export default class Actions {
  static auth(payload: User) {
    return {type: 'AUTH', payload: payload};
  }

  static logOut() {
    return {type: 'LOG_OUT', payload: initialState};
  }

  static createGame(payload: GameType) {
    return {type: 'CREATE_GAME', payload};
  }

  static changeBalance(payload: number) {
    return {type: 'CHANGE_BALANCE', payload};
  }

  static changeStatus(payload: boolean) {
    return {type: 'CHANGE_STATUS', payload};
  }

  static addReply(payload: ReplyType) {
    return {type: 'ADD_REPLY', payload};
  }

  static endGame(payload: GameType) {
    return {type: 'END_GAME', payload};
  }
  static initThemes(payload: ITheme[]) {
    return {type: 'INIT_THEMES', payload: payload};
  }
}
