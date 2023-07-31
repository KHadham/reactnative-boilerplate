import { StyleSheet } from 'react-native';

import {
  COLOR_WHITE,
  COLOR_EVENT_INACTIVE,
  COLOR_FONT_PRIMARY_LIGHT,
  COLOR_BASE_SECONDARY_MAIN,
  COLOR_EVENT_INFORMATION
} from '@styles/';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 15,
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowColor: COLOR_EVENT_INACTIVE,
    shadowOffset: { height: 0, width: 0 },
    elevation: 10,
    backgroundColor: COLOR_WHITE,
    zIndex: 10
  },
  textStatusContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50
  },
  textStatusStyle: {
    color: COLOR_BASE_SECONDARY_MAIN,
    fontSize: 14,
    fontWeight: '500'
  },
  textMessageContainer: {
    flex: 2,
    alignItems: 'flex-start'
  },
  textMessage: {
    color: COLOR_FONT_PRIMARY_LIGHT,
    fontSize: 14,
    fontWeight: '500'
  },
  cbText: {
    color: COLOR_EVENT_INFORMATION,
    fontSize: 14,
    fontWeight: '600'
  }
});
