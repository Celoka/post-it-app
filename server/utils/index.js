export default {

  normalizeData(data) {
    if (!data) {
      return [];
    }
    const keys = Object.keys(data);
    const result = [];
    keys.forEach((key) => {
      const groupId = key;
      const { dateCreated, groupname, messages, users } = data[key];
      result.push({
        groupId,
        dateCreated,
        groupname,
        messages,
        users
      });
    });
    return result;
  }
};
