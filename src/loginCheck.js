const isLoggedIn = () => {
   const state = JSON.parse(localStorage.getItem('user'));
   if (state === null) {
      return false;
   }
   return true;
}

export default isLoggedIn;