import AppConstants from '../../src/constants/AppConstants';

export const addedMember = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.ADD_USER_TO_GROUP,
    payload: {
      data: {
        message: 'User added successfully'
      }
    }
  }
};

export const getAllUsers = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.GET_ALL_USERS,
    payload: {
      data: {
        message: 'Users retrieved successfully',
        usersDetails: [
          {
            userId: 'AKFnhd92XHNvMGHmUSHJ2CGt1Au1',
            userNames: 'West'
          },

          {
            userId: 'HIBpkdz7IfTSyOyLbevWasL78HD3',
            userNames: 'West'
          },

          {
            userId: 'JZDm5SXVRoRkX8ZZGwkGIqCg3Hn1',
            userNames: 'Chinwendu'
          },

          {
            userId: 'f9TGDZzckNhTxr4KakHiChiAVYP2',
            userNames: 'Ebuka'
          }
        ]
      }
    }
  }
};

export const loadNewUsers = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.LOAD_NEW_USERS,
    payload: {
      data: {
        users: [
          {
            userNames: 'West'
          },

          {
            userNames: 'Chinwendu'
          },

          {
            userNames: 'Ebuka'
          }
        ]
      }
    }
  }
};

export const googleUpdate = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.GOOGLE_UPDATE,
    payload: {
      isConfirmed: true,
      jwtToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJEYmdRTWpzWjVCVkptRW43RG1ZVzJQbGdVdXoyIiwiZGlzcGxheU5hbWUiOiJFbG9rYSBjaGltYSIsImVtYWlsIjoiZWxva2FjaGltYUBnbWFpbC5jb20iLCJpYXQiOjE1MTA4MzA1MTIsImV4cCI6MTUxMDgzNDExMn0.np2HOTEgliKNpO__GDYD3XWQ1ncVl9phbEi5uVXGiXk',
      message: 'Login successful'
    }
  }
};

export const allGroupMessages = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.LOAD_NEW_USERS,
    payload: {
      data: {
        message: 'Message retrieved successfully',
        groupMessage: [
          {
            messageId: '-KznV7kzR0j3Ge8r9tr-',
            groupMessage: 'Hello world ',
            timeStamp: 'Saturday, November 25, 2017 3:06 PM',
            priority: 'Normal',
            displayName: 'Emeka'
          }
        ]
      }
    }
  }
};

export const groupNames = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.LOAD_GROUP_NAMES,
    payload: {
      data: {
        status: 'Message retrieved successfully',
        userGroups: [
          {
            groupId: '-Kwz6LQ8P66M25GfxlNQ',
            groupname: 'Nwendu'
          },

          {
            groupId: '-Kwz6UdeGr7kjKRhpE0T',
            groupname: 'Ebuka'
          },

          {
            groupId: '-KwzMzLzSbVLm_Vsauwd',
            groupname: 'Andela'
          }
        ]
      }
    }
  }
};

export const googleLogin = {
  source: 'VIEW_ACTION',
  actions: {
    actionType: AppConstants.GOOGLE_LOGIN,
    payload: {
      isConfirmed: false,
      jwtToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJDQnJYS05mSFdZUVZUa2wyMlkwRzZNWWFyMHQxIiwiZGlzcGxheU5hbWUiOiJFbG9rYSBjaGltYSIsImVtYWlsIjoiZWxva2FjaGltYUBnbWFpbC5jb20iLCJpYXQiOjE1MTA4Mjk2MDMsImV4cCI6MTUxMDgzMzIwM30.V6ECaccJ3lR0gwc3y2bzb2psjMT7JFddWiQTRODp_MM',
      message: 'Another step is required '
    }
  }
};

export const registerUser = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.GET_ALL_USERS,
    payload: {
      data: {
        isConfirmed: true,
        jwtToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJDandoVmZOZU9OT1ZrT1g5UVp6bVFGMko1ajgzIiwiZGlzcGxheU5hbWUiOiJFbWVrYSIsImlhdCI6MTUxMTYxODUzNCwiZXhwIjoxNTExNzA0OTM0fQ.ufKD1ru8iwhLru63f_mogzZcyq_5lUYt-vcGizvs3V0',
        message: 'Registration success'
      }
    }
  }
};

export const groupMessage = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.SET_GROUP_MESSAGE,
    data: {
      status: 'Message retrived succcessfully',
      groupMessage: [
        {
          messageId: '-Kx-bhNDZLmYclETVJUc',
          message: 'Humanity is the oldest religion.',
          time: 'Sat Oct 21 2017 21:27:51 GMT+0100 (WAT)',
          priority: 'Critical',
          user: 'JZDm5SXVRoRkX8ZZGwkGIqCg3Hn1'
        },

        {
          messageId: '-Kx-bpTOVwHSHS8Qv7mf',
          message: 'We will hereby commence our product launch',
          time: 'Sat Oct 21 2017 21:28:25 GMT+0100 (WAT)',
          priority: 'Urgent',
          user: 'JZDm5SXVRoRkX8ZZGwkGIqCg3Hn1'
        },

        {
          messageId: '-KxAdcAa8gylf2UncLw5',
          message: 'Hello world ',
          time: 'Tue Oct 24 2017 00:52:04 GMT+0100 (WAT)',
          priority: 'Normal',
          user: 'JZDm5SXVRoRkX8ZZGwkGIqCg3Hn1'
        }
      ]
    }
  }
};

export const groupName = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.GET_ALL_USERS,
    payload: {
      data: {
        message: 'Users retrieved successfully',
        usersDetails: [
          {
            userId: 'AKFnhd92XHNvMGHmUSHJ2CGt1Au1',
            userNames: 'West'
          },

          {
            userId: 'HIBpkdz7IfTSyOyLbevWasL78HD3',
            userNames: 'West'
          },

          {
            userId: 'JZDm5SXVRoRkX8ZZGwkGIqCg3Hn1',
            userNames: 'Chinwendu'
          },

          {
            userId: 'f9TGDZzckNhTxr4KakHiChiAVYP2',
            userNames: 'Ebuka'
          }
        ]
      }
    }
  }
};
