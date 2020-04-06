import { getGroups } from "../action/groups";
import { getProfiles } from "../action/users";

export function getUsers(page, query, profiles) {
  getProfiles(page, query);
  const userNames = profiles.map(u => u.userName);
  const res = userNames.map(p => ({
    value: p,
    label: p
  }));
  return res;
}
export function getGroupsPerm(page, query, groups) {
  getGroups(page, query);
  const titles = groups.map(u => u.title);
  const res = titles.map(p => ({
    value: p,
    label: p
  }));
  return res;
}
export function loadUsers(page, inputValue, profiles, callback) {
  setTimeout(() => {
    callback(getUsers(page, inputValue, profiles));
  }, 0);
}
export function loadGroups(page, inputValue, groups, callback) {
  setTimeout(() => {
    callback(getGroupsPerm(page, inputValue, groups));
  }, 0);
}
