import React from 'react';
import { mount } from 'enzyme';
import AppActions from '../../src/actions/AppActions';
import BoardNavigation from '../../src/components/BoardNavigation.jsx';

describe('<BoardNavigation />', () => {
  const props = {
    userName: 'test',
  };
  const wrapper = mount(<BoardNavigation {...props} />,
    {
      childContextTypes: { router: React.PropTypes.object },
      context: {
        router: {
          history: {
            push: () => null,
            createHref: () => null,
            replace: () => null
          }
        }
      }
    }
  );
  it('it should sign out a user', () => {
    const logOutSpy = jest.spyOn(AppActions, 'logOut');
    wrapper.find('li').simulate('click');
    expect(logOutSpy).toHaveBeenCalled();
  });
});
