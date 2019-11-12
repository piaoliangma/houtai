/**
 * @Project Name: wu-admin
 * @Author: wuliang
 * @Date: 2019-05-05 
 * @Email: 785590408s@163.com
 * @Idea: vscode
 */
const localStorage = window.localStorage;
export default {
  getItem (key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (err) {
      return null;
    }
  },
  setItem (key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  },
  removeItem (key) {
    localStorage.removeItem(key);
  },
  clear () {
    localStorage.clear();
  },
  keys () {
    return localStorage.keys();
  }
};


