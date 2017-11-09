/**
 * @description Helper function to resolve data into an array of object
 *
 * @param {object} data object
 *
 * @return { array } return an array containing an group object details
 */
export default {

  normalizeData(data) {
    if (!data) {
      return [];
    }
    const keys = Object.keys(data);
    const result = [];
    keys.forEach((key) => {
      const groupId = key;
      const { dateCreated, groupName, messages, users } = data[key];
      result.push({
        groupId,
        dateCreated,
        groupName,
        messages,
        users
      });
    });
    return result;
  },
};
