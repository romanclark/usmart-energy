const rules = {
    visitor: {
      static: ["home-page:visit", "about-page:visit"]
    },
    user: {
      static: [
        "users:getSelf",
        "home-page:visit",
        "profile-page:visit",
        "homeowner-pages:visit",
      ],
    //   dynamic: {
    //     "posts:edit": ({userId, postOwnerId}) => {
    //       if (!userId || !postOwnerId) return false;
    //       return userId === postOwnerId;
    //     }
    //   }
    },
    admin: {
      static: [
        "users:get",
        "users:getSelf",
        "home-page:visit",
        "profile-page:visit",
        "operator-pages:visit",
      ],
    }
  };
  
  export default rules;